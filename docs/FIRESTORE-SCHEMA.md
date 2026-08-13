# Firestore Schema

## Overview

All collections use the typed collection pattern — see `frontend/src/lib/firebase/firestore.ts`.
Security rules are in `firebase/firestore.rules`.

When adding a new collection, use the `/firebase-collection` Claude Code skill.

## Schema versioning

Every document in every collection **must** include a `_schemaVersion` field:

```typescript
_schemaVersion: 1  // increment when doing a breaking schema change
```

This enables **lazy migration** — when a document is read, check `_schemaVersion` and migrate on the fly if it's behind current. See the `/evolve-schema` skill for the full migration workflow.

**Rules:**
- `_schemaVersion` is always `1` on creation
- Non-breaking changes (adding optional fields with defaults) keep the same version
- Breaking changes (rename, remove, type change) increment the version and require a migration function
- Never remove `_schemaVersion` from a schema

---

## `users` collection

**Path:** `/users/{userId}`
**Access:** Owner-only (user can read/write their own document; admins can read all)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `uid` | `string` | Yes | Firebase Auth UID (same as document ID) |
| `email` | `string` | Yes | User's email address |
| `displayName` | `string \| null` | Yes | Display name from Auth or profile |
| `photoURL` | `string \| null` | Yes | Profile photo URL |
| `role` | `'user' \| 'admin'` | Yes | User role — immutable by user after creation |
| `createdAt` | `Timestamp` | Yes | When the document was created |
| `updatedAt` | `Timestamp` | Yes | When the document was last updated |
| `_schemaVersion` | `1` | Yes | Schema version for lazy migration |

**Creation:** Auto-created by `AuthProvider` on first sign-in via `syncUserProfile()`.
**Deletion:** Hard-delete is disabled in security rules. Use `deletedAt` field for soft-delete.

---
---

## `teamMembers` collection

**Path:** `/teamMembers/{memberId}`
**Access:** Read-only for any authenticated user; no client write path — managed out-of-band via `frontend/scripts/seed-team.mjs` using the Admin SDK, which bypasses security rules

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| `name` | `string` | Yes | Team member's display name |
| `role` | `string` | Yes | Job title / role on the team |
| `description` | `string` | Yes | Short blurb about the member |
| `photoURL` | `string \| null` | Yes | Profile photo URL, or `null` to show the default placeholder avatar |
| `order` | `number` | Yes | Display order on the Team Page |
| `createdAt` | `Timestamp` | Yes | When the document was created |
| `updatedAt` | `Timestamp` | Yes | When the document was last updated |
| `_schemaVersion` | `1` | Yes | Schema version for lazy migration |

**Creation:** Seeded manually via `node --env-file=../.env scripts/seed-team.mjs` from the `frontend/` directory.
**Deletion:** Not supported through the app; edit or delete documents directly via the Firebase console if needed.

<!-- Add new collection schemas below using the /firebase-collection skill -->
