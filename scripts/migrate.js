#!/usr/bin/env node
// Usage: DATABASE_URL=postgres://... node scripts/migrate.js
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL first (e.g. in a .env file — see .env.example).')
    process.exit(1)
  }
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false },
  })
  const sql = fs.readFileSync(path.join(__dirname, '..', 'api', '_lib', 'schema.sql'), 'utf8')
  console.log('Running schema.sql ...')
  await pool.query(sql)
  console.log('Done. Tables "properties" and "audit_log" are ready.')
  await pool.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
