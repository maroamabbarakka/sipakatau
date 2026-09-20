# 08 — ARSITEKTUR, STRUKTUR DATA, API, DAN DEPLOYMENT

## Arsitektur referensi (belum disahkan untuk produksi)

```text
WA -> Kirimdev -> signed webhook --\
                                  Cloud Run API Jakarta (proyek layanan terpisah)
Web form -> Firebase Hosting ----/  | validate + idempotent persist
                                    | Firestore Jakarta (proyek Firebase app)
                                    | rules engine + audit + outbox
                                    | AI policy gate -> Gemini adapter OPTIONAL
                                    | private attachment storage Indonesia
                                    | cost ledger + monitored worker/scheduler
Staff SPA -> Auth/MFA -> API ------/  | backup -> independent approved destination
Cloudflare -> DNS + aset PUBLIK, bukan default evidence storage
```

**Konfirmasi sebelum produksi:** Spark vs Blaze berdasarkan kebutuhan backup; kedua proyek bisa dipisahkan secara operasional, tetapi IAM lintas proyek, Cloud Billing, secret management, backup, region data, vendor WA dan Gemini harus disahkan. Cloudflare R2 Free Tier tidak membuktikan residensi Indonesia. Admin SDK melewati Firestore Rules; otorisasi API tidak bisa didelegasikan kepada Rules frontend.

## Firestore: koleksi minimum

| Koleksi | Field inti | Akses |
|---|---|---|
| `intake_events/{event_key}` | source, source_id, hash, received_at, status, case_id | hanya backend |
| `cases/{case_id}` | ticket, category, level, urgency, owner, status, privacy, sla_version | ABAC per kasus |
| `case_messages/{id}` | case_id, direction, original_ref, redacted_text, vendor_id, time | scoped |
| `case_events/{id}` | seq, case_id, actor, old/new, reason, request_id, time | append-only |
| `case_assignments/{id}` | case_id, owner, valid_from/to, assignment_reason | scoped |
| `case_links/{id}` | source_case, target_case, type, reviewer | authorized |
| `case_attachments/{id}` | storage_key, sha256, mime, bytes, scan_status | private gateway |
| `reporters_private/{id}` | encrypted WA, contact preference, vault_version | identity custodian/gateway |
| `case_subjects_private/{id}` | case id, data minimum, relation | petugas khusus |
| `categories/{Kxx}` | owner, backup, fallback, version, enabled, policy | admin write |
| `schools/{id}` | NPSN verified, name, level, district, last_sync | curated |
| `users/{uid}` | roles, scope, status, MFA | admin auth |
| `routing_rules/{id}` | version, predicates, exclusions, effective_at | change controlled |
| `sla_policies/{id}` | durations, calendar, version | admin gated |
| `ai_runs/{id}` | sanitized hash, prompt/model, output, tokens, gate decision | authorized |
| `outbox/{id}` | vault ref, kind, state, retry, vendor id, idem key | service only |
| `cost_ledger/{id}` | vendor, usage, rate snapshot, currency, period | finance |
| `audit_logs/{id}` | actor, action, reason, outcome, request id, time | security |
| `daily_counters/{date}` | aggregate count by status/category/level | scoped aggregate |

Jangan gunakan nomor telepon/NIK sebagai ID dokumen/path/URL. Gunakan ID acak, server timestamps, schema_version, metadata create/update dan indeks komposit sesuai query. Token pelacakan disimpan hash. Field privat hanya dikirim jika policy mengizinkan—menyembunyikan elemen HTML tidak cukup.

## API v1 baseline

| Method | Endpoint | Caller | Kontrak penting |
|---|---|---|---|
| POST | `/v1/intake/form` | publik | validasi + idempotency; 201 ticket, token hanya sekali |
| POST | `/v1/webhooks/kirimdev` | vendor | HMAC raw body, timestamp, durable intake, 2xx setelah persist |
| GET | `/v1/tickets/{ticket}/status` | token holder | status aman, no sensitive data |
| POST | `/v1/tickets/{ticket}/messages` | token holder | tambahan pesan, ownership check |
| GET | `/v1/me/cases` | staf | scoped list, cursor pagination |
| GET | `/v1/cases/{id}` | staf | ABAC + field masking |
| POST | `/v1/cases/{id}/assign` | pusat | conflict check + transaction + event |
| POST | `/v1/cases/{id}/transition` | owner/reviewer | guarded FSM, version conflict 409 |
| POST | `/v1/cases/{id}/reply` | owner | outbox; no direct WA number return |
| POST | `/v1/cases/{id}/appeal` | pelapor/staf | tiket terkait parent |
| GET | `/v1/dashboard/summary` | pimpinan/scoped | server-side aggregated and safe |
| PUT | `/v1/admin/categories/{id}` | admin | dual review for sensitive change |
| POST | `/v1/admin/identity-unlock` | custodian | reason + approval + audit |
| GET | `/v1/admin/costs` | finance/admin | ledger tanpa PII |

Contoh respons form:

```json
{
  "request_id": "opaque-request",
  "ticket_number": "SIP-2026-EXAMPLE",
  "tracking_secret_once": "SECURE_RANDOM_ONLY_IN_RESPONSE",
  "state": "RECEIVED",
  "notice": "Simpan kode ini dan jangan bagikan."
}
```

**HTTP:** 201 new, 200 replay, 202 async, 400 invalid, 401 bad authentication/HMAC, 403 insufficient privilege, 404 generic not found, 409 state conflict, 413 oversize, 422 validation, 429 rate limit, 503 persistence unavailable. Semua respons termasuk request ID; log tidak boleh mengandung token/kontak/payload sensitif.

## Staging, konfigurasi dan deployment

```text
frontend/                 SPA + typed API client
backend/src/modules/      intake/cases/routing/whatsapp/ai/privacy/costs/backup
packages/contracts/       JSON Schema / OpenAPI / enums shared
infra/                    config/IaC nonsecret untuk staging dan prod
tests/                    unit/integration/e2e/security/a11y/load
docs/                     ADR/runbooks/change log
```

Nama proyek cloud tidak hard-coded di client. Akun vendor, domain, nomor WA, repository dan billing harus atas nama instansi. Gunakan service account least privilege, akses backend lintas proyek seperlunya, secret manager, origin/CORS allowlist, anti-CSRF jika cookie, limit max instances dan concurrency Cloud Run. `min_instances=0` hanya setelah uji cold start dan webhook. Deploy lewat CI stage-gated; rollback dan migration harus terbukti pada staging.
