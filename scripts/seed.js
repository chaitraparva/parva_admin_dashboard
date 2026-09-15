#!/usr/bin/env node
// Usage: DATABASE_URL=postgres://... node scripts/seed.js
// Safe to run once. Skips seeding if the properties table already has rows.
import 'dotenv/config'
import pg from 'pg'
import { propertyToRow } from '../api/_lib/mapper.js'
import seedData from './seed-data.js'

const { Pool } = pg

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL first (e.g. in a .env file — see .env.example).')
    process.exit(1)
  }
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false },
  })

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM properties')
  if (rows[0].count > 0) {
    console.log(`properties table already has ${rows[0].count} rows — skipping seed. `
      + `Run "DELETE FROM properties;" first if you really want to reseed.`)
    await pool.end()
    return
  }

  for (const p of seedData) {
    const row = propertyToRow(p)
    const cols = Object.keys(row)
    const values = Object.values(row)
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ')
    await pool.query(`INSERT INTO properties (${cols.join(', ')}) VALUES (${placeholders})`, values)
    console.log('Inserted:', p.name)
  }

  console.log(`\nSeeded ${seedData.length} properties.`)
  await pool.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
