// One-off seed script for the teamMembers collection.
// Run from the frontend/ directory:
//   node --env-file=../.env scripts/seed-team.mjs

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

console.log('--- seed-team diagnostics ---')

const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

console.log('key loaded:', key ? `yes (${key.length} chars)` : 'NO — MISSING')
console.log('projectId:', projectId ?? 'NO — MISSING')

if (!key) {
  console.error('FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set. Run this with --env-file=../.env')
  process.exitCode = 1
} else {
  try {
    const decoded = JSON.parse(Buffer.from(key, 'base64').toString('utf8'))
    console.log('decoded service account project_id:', decoded.project_id)

    const app = initializeApp({
      credential: cert(decoded),
      projectId,
    })
    const db = getFirestore(app)

    const members = [
      {
        id: 'chelsea-lasslett',
        name: 'Chelsea Lasslett',
        role: 'Project Manager',
        description: 'Coordinates sprints, stakeholder communication, and delivery for SRFU.',
        photoURL: null,
        order: 1,
      },
     {
        id: 'minh',
        name: 'Minh Nguyen',
        role: 'UX Designer',
        description: 'Leads UX research, wireframing, and interface design for the SRFU application.',
        photoURL: null,
        order: 2,
        },
      {
        id: 'chriswin-joseph',
        name: 'Chriswin Joseph',
        role: 'Developer',
        description:
          'Full-stack development on SRFU, focused on auth, Firestore, and cloud infrastructure.',
        photoURL: null,
        order: 3,
      },
      {
        id: 'savio-simon',
        name: 'Savio Simon',
        role: 'Business Analyst & Developer',
        description: 'Gathers and documents requirements, and contributes to full-stack development on SRFU.',
        photoURL: null,
        order: 4,
    },
    ]

    const batch = db.batch()
    const now = FieldValue.serverTimestamp()

    for (const { id, ...data } of members) {
      const ref = db.collection('teamMembers').doc(id)
      batch.set(ref, {
        ...data,
        createdAt: now,
        updatedAt: now,
        _schemaVersion: 1,
      })
    }

    console.log('committing batch...')
    await batch.commit()
    console.log(`SUCCESS: seeded ${members.length} team members.`)
  } catch (err) {
    console.error('SEED FAILED:', err)
    process.exitCode = 1
  }
}

console.log('--- end diagnostics ---')