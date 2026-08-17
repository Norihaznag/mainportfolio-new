# Effective CPM Ad Integration Verification

Date: 2026-08-17

## Units installed

1. Popunder
   - Source: https://pl30894328.effectivecpmnetwork.com/fa/90/e5/fa90e586b202463cd912efe34a62a5da.js
   - Location: `app/layout.tsx` `<head>`
   - Strategy: `beforeInteractive`
   - Scope: all non-admin pages

2. Social Bar
   - Source: https://pl30894329.effectivecpmnetwork.com/ff/02/3d/ff023da77b2ef6405e884728f477fd38.js
   - Location: `app/layout.tsx` body, after application content
   - Strategy: `afterInteractive`
   - Scope: all non-admin pages

3. Native Banner
   - Loader: https://pl30894330.effectivecpmnetwork.com/8737b674aeea3a529372ad4f7645471a/invoke.js
   - Container: `container-8737b674aeea3a529372ad4f7645471a`
   - Location: `app/page.tsx`
   - Strategy: `afterInteractive`
   - Scope: homepage
   - Container has a minimum render height.

4. Sponsored direct link
   - URL: https://www.effectivecpmnetwork.com/bxtpyr1y?key=7d793a27b03422769a74a962a6d2fa3c
   - `rel="nofollow sponsored noopener noreferrer"`

## Critical fix

The previous project had a Content-Security-Policy that did NOT allow `*.effectivecpmnetwork.com` in `script-src`/`script-src-elem`, and did not allow the network's iframes in `frame-src`. That could prevent the scripts/ad frames from executing even though the `<script>` tags existed.

The CSP now explicitly permits the three supplied loader hosts and Effective CPM frames.

## Admin exclusion

All Effective CPM units remain excluded from `/adminos`.

## Build note

This archive was statically verified for the required snippets, their locations, the native container, and CSP allow-list. A full Next.js production build could not be executed in this environment because the project dependencies are not installed and the package registry is unavailable from the execution environment.

## Deployment requirement

After deploying this archive, verify in the browser:
- DevTools > Network: requests to `pl30894328`, `pl30894329`, and `pl30894330` are not blocked.
- DevTools > Console: no CSP errors mentioning `effectivecpmnetwork.com`.
- View Source/Elements: Popunder loader is present on a public page.
- Native banner container exists on `/`.
