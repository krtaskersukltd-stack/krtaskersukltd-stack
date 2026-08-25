type ScreenshotObject = {
  body: ReadableStream;
};

type ScreenshotBucket = {
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView,
    options?: { httpMetadata?: { contentType?: string } },
  ): Promise<unknown>;
  get(key: string): Promise<ScreenshotObject | null>;
  delete(key: string): Promise<void>;
};

export async function getScreenshotBucket(): Promise<ScreenshotBucket | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const context = getCloudflareContext();
    return ((context.env as unknown as { SCREENSHOTS?: ScreenshotBucket }).SCREENSHOTS ?? null);
  } catch {
    return null;
  }
}
