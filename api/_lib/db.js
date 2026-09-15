// Shared Postgres connection pool for all API routes.
// Works with any standard Postgres provider (Vercel Postgres, Neon, Supabase,
// AWS RDS, Railway, etc.) — just set DATABASE_URL in your environment.
import pg from 'pg'
const { Pool } = pg

let pool

export function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL is not set. Add it to your environment (Vercel Project Settings → Environment Variables).'
      )
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Most managed Postgres providers require SSL. Set PGSSL=disable for local dev without SSL.
      ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false },
      max: 5,
    })
  }
  return pool
}

export async function query(text, params) {
  const client = getPool()
  return client.query(text, params)
}
