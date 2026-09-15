#!/usr/bin/env node
// Usage: node scripts/hash-password.js "YourSharedPassword"
// Paste the printed hash into the ADMIN_PASSWORD_HASH environment variable.
// The plain password itself is never stored anywhere.
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/hash-password.js "YourSharedPassword"')
  process.exit(1)
}

bcrypt.hash(password, 12).then(hash => {
  console.log('\nADMIN_PASSWORD_HASH=' + hash + '\n')
  console.log('Add this to your environment variables (Vercel → Project → Settings → Environment Variables).')
})
