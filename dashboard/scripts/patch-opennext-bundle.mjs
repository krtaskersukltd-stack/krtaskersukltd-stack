import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const bundlePath = join(process.cwd(), '.open-next', 'server-functions', 'default', 'handler.mjs');
const generatedWasmPath = join(
  process.cwd(),
  'src',
  'generated',
  'd1',
  'internal',
  'query_engine_bg.wasm',
);
const bundledWasmPath = join(
  process.cwd(),
  '.open-next',
  'server-functions',
  'default',
  'src',
  'generated',
  'd1',
  'internal',
  'query_engine_bg.wasm',
);
const dynamicMiddlewareManifest =
  'getMiddlewareManifest(){return this.minimalMode?null:require(this.middlewareManifestPath)}';
const emptyMiddlewareManifest =
  'getMiddlewareManifest(){return this.minimalMode?null:{version:3,middleware:{},sortedMiddleware:[],functions:{}}}';
const nullMiddlewareManifest = 'getMiddlewareManifest(){return null}';
const wasmImport =
  'import prismaQueryEngineWasm from "./src/generated/d1/internal/query_engine_bg.wasm";\n' +
  'globalThis.__PRISMA_QUERY_ENGINE_WASM__ = prismaQueryEngineWasm;\n';

let bundle = readFileSync(bundlePath, 'utf8');
let changed = false;

if (bundle.includes(emptyMiddlewareManifest) || bundle.includes(nullMiddlewareManifest)) {
  console.log('OpenNext middleware manifest patch already applied.');
} else if (bundle.includes(dynamicMiddlewareManifest)) {
  bundle = bundle.replace(dynamicMiddlewareManifest, emptyMiddlewareManifest);
  changed = true;
  console.log('Patched unsupported dynamic middleware-manifest require.');
} else {
  throw new Error('OpenNext middleware manifest pattern changed; refusing to deploy an unverified bundle.');
}

if (bundle.includes('WebAssembly.instantiate(prismaQueryEngineWasm')) {
  if (bundle.includes('(result.instance??result).exports')) {
    console.log('Prisma WebAssembly module patch already applied.');
  } else {
    const upgraded = bundle.replace(
      /\.then\(instance=>Object\.assign\(([$\w]+),instance\.exports\)\)/,
      '.then(result=>Object.assign($1,(result.instance??result).exports))',
    );
    if (upgraded === bundle) {
      throw new Error('Could not safely upgrade the Prisma WebAssembly result handler.');
    }
    bundle = upgraded;
    changed = true;
    console.log('Upgraded Prisma WebAssembly loader to support both instantiate result shapes.');
  }
} else {
  const wasmPathMarker = '"static/wasm/"';
  const markerIndex = bundle.indexOf(wasmPathMarker);
  const loaderDotIndex = bundle.lastIndexOf('.v=', markerIndex);
  if (markerIndex < 0) {
    if (!bundle.startsWith(wasmImport)) bundle = wasmImport + bundle;
    changed = true;
    console.log('Injected the Prisma Cloudflare WebAssembly.Module bootstrap.');
  } else {
    if (loaderDotIndex < 1) {
      throw new Error('Webpack WebAssembly loader pattern changed; refusing to deploy an unverified bundle.');
    }

    let loaderStart = loaderDotIndex - 1;
    while (loaderStart > 0 && /[$\w]/.test(bundle[loaderStart - 1])) loaderStart -= 1;

    const loaderPrefix = bundle.slice(loaderStart, markerIndex);
    const params = loaderPrefix.match(
      /^([$\w]+)\.v=\(([$\w]+),([$\w]+),([$\w]+),([$\w]+)\)=>/,
    );
    const loaderEndToken = '.instance.exports))';
    const loaderEndIndex = bundle.indexOf(loaderEndToken, markerIndex);
    if (!params || loaderEndIndex < 0) {
      throw new Error('Could not safely identify the Webpack WebAssembly loader boundaries.');
    }

    const [, runtimeName, moduleObject, moduleId, wasmHash, imports] = params;
    const replacement =
      `${runtimeName}.v=(${moduleObject},${moduleId},${wasmHash},${imports})=>` +
      `Promise.resolve(WebAssembly.instantiate(prismaQueryEngineWasm,${imports}))` +
      `.then(result=>Object.assign(${moduleObject},(result.instance??result).exports))`;
    bundle =
      bundle.slice(0, loaderStart) +
      replacement +
      bundle.slice(loaderEndIndex + loaderEndToken.length);
    if (!bundle.startsWith(wasmImport)) bundle = wasmImport + bundle;
    changed = true;
    console.log('Patched Webpack WASM loader to use a bundled Cloudflare WebAssembly.Module.');
  }
}

if (changed) writeFileSync(bundlePath, bundle);

mkdirSync(join(bundledWasmPath, '..'), { recursive: true });
copyFileSync(generatedWasmPath, bundledWasmPath);
console.log('Copied the Prisma query engine WebAssembly module into the Worker bundle.');
