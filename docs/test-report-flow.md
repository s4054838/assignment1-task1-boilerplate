# Test Report — Login → Redirect → Team Page Flow

**Tester:** Savio Simon (Dev 2)
**Date:** 15 August 2026
**Environment:** Production (assignment1-task1-boilerplate-front.vercel.app)

## Scope

Manual verification of the happy-path login flow after the login restyle and team
page build were deployed.

## Steps tested

1. Navigated to `/auth/signin` on the deployed production URL (not localhost).
2. Signed in with a valid account.
3. Confirmed automatic redirect to `/team` on successful login.
4. Confirmed all four team member cards render correctly on the deployed URL:
   - Chelsea Lasslett — photo, role, and blurb all display correctly.
   - Minh Nguyen — photo, role, and blurb all display correctly.
   - Chriswin Joseph — photo, role, and blurb all display correctly.
   - Savio Simon — photo, role, and blurb all display correctly.
5. Signed out and attempted to navigate directly to `/team` without an active session.
6. Confirmed the app redirected back to `/auth/signin` instead of rendering the team
   page.

## Result

**Pass.** No issues found on the happy path. Login, redirect, team page render, and
the logged-out redirect guard all behaved as expected on the deployed build.

## Notes

- All four bios render in full with no truncation — there is no expand/read-more
  interaction on the team page. This is not a bug; that feature was never built for
  this sprint.
- No automated test script exists for this flow yet — this was a manual verification
  pass only.

## Next steps

Edge cases (invalid credentials, empty fields, broken/missing photo URLs, very long
bios) to be tested and documented separately.