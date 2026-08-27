import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Try reading .env.local if token not in process.env
const envLocalPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=')
      const val = rest.join('=').trim()
      if (key && val && !process.env[key.trim()]) {
        process.env[key.trim()] = val
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8fy8ish4'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token =
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.log('\x1b[33m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════════════')
  console.log('\x1b[33m%s\x1b[0m', '  SANITY TOKEN REQUIRED TO AUTO-CREATE ALL 41 WEBSITE DOCUMENTS')
  console.log('\x1b[33m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════════════')
  console.log('Sanity requires write permission to push documents into your cloud dataset.')
  console.log('\nQuick 30-Second Setup:')
  console.log(`1. Open: https://www.sanity.io/manage/project/${projectId}/api`)
  console.log('2. Click "+ Add API token", Name it "Auto Seed", select Role: "Editor"')
  console.log('3. Copy the token and add it to your .env.local file:')
  console.log('   SANITY_API_TOKEN=your_copied_token_here')
  console.log('\n4. Run:')
  console.log('   npm run seed:sanity')
  console.log('\x1b[33m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════════════\n')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seedData() {
  const ndjsonPath = path.join(__dirname, '..', 'data', 'sanity-export.ndjson')
  if (!fs.existsSync(ndjsonPath)) {
    console.error('Export file not found at:', ndjsonPath)
    process.exit(1)
  }

  const rawLines = fs.readFileSync(ndjsonPath, 'utf-8').split('\n').filter(Boolean)
  console.log(`\x1b[36mImporting ${rawLines.length} documents into Sanity (Project: ${projectId}, Dataset: ${dataset})...\x1b[0m\n`)

  let successCount = 0
  for (const line of rawLines) {
    try {
      const doc = JSON.parse(line)
      await client.createOrReplace(doc)
      console.log(`  ✓ [${doc._type.padEnd(12)}] ${doc.name || doc.title || doc.siteName || doc.label || doc._id}`)
      successCount++
    } catch (err) {
      console.error(`  ✗ Error creating document:`, err.message)
    }
  }

  console.log(`\n\x1b[32m✨ Successfully created ${successCount} documents in Sanity Studio!\x1b[0m`)
  console.log('\x1b[32mOpen http://localhost:3000/studio/structure and all pages, services, blogs, team, and settings will appear ready to edit!\x1b[0m\n')
}

seedData().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
