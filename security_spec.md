# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Bootstrapped Administrator Protection**: Only the verified administrator (`leoaraujobh@gmail.com` with `email_verified == true` or a document in `/admins/{uid}`) can create, update, or delete documents in `/public_models/{siteId}` and `/admin_sites/{siteId}`.
2. **PII Isolation (Split Collection Pattern)**:
   - `/admin_sites/{siteId}` contains private client management records and is strictly readable and writable ONLY by `isAdmin()`.
   - `/public_models/{siteId}` contains ONLY public showcase presentation fields and is readable on the Landing Page only when `resource.data.isLandingModel == true` (or by `isAdmin()`).
3. **Strict Schema, Key Allowlisting & Volumetric Bounds**:
   - Every string field enforces `.size() <= maxLength`.
   - Document IDs (`siteId`) are validated with `isValidId(siteId)` (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
   - `ownerId` must match `request.auth.uid` on creation and remain immutable on update.
   - `updatedAt` must equal `request.time`.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write to `/admin_sites/site-1`**: Rejected (`isSignedIn()` is false).
2. **Non-Admin Authenticated Read on `/admin_sites/site-1`**: Rejected (`isAdmin()` is false).
3. **Unverified Admin Email Spoof (`email == 'leoaraujobh@gmail.com'`, `email_verified == false`)**: Rejected (`email_verified == true` required).
4. **Shadow Field Injection (`ghostField: true` on `/public_models/site-1`)**: Rejected by `.keys().hasOnly(...)`.
5. **ID Poisoning (`siteId` with 200 chars or special characters)**: Rejected by `isValidId(siteId)`.
6. **Owner Spoofing (`ownerId != request.auth.uid` on create)**: Rejected by `data.ownerId == request.auth.uid`.
7. **Owner Mutation (`incoming().ownerId != existing().ownerId` on update)**: Rejected by immutability check.
8. **Timestamp Forgery (`updatedAt != request.time`)**: Rejected by `data.updatedAt == request.time`.
9. **Oversized String Payload (`clientName` > 160 chars)**: Rejected by `.size() <= 160`.
10. **Invalid Status Enum (`status: 'hacked'` in `/admin_sites/site-1`)**: Rejected by `data.status in ['active', 'overdue', 'disabled']`.
11. **Public Read of Unmarked Model (`isLandingModel == false` in `/public_models/site-1` by anonymous user)**: Rejected (`resource.data.isLandingModel == true` required).
12. **Value Poisoning on Update (`isLandingModel: 'yes'` string instead of bool)**: Rejected because `isValidPublicModel(incoming())` wraps the entire update block.
