# FUDMA ODL Implementation Plan (4 x Two-Week Sprints)

This roadmap prioritizes mobile performance, secure RBAC, and low-bandwidth reliability while delivering the three core modules incrementally.

## Sprint 1 (Weeks 1-2): Application Portal + Remita Integration Only

### Features to Build
- Public-facing admission pages (program list, requirements, deadlines, FAQs).
- Applicant account creation and login with email/phone verification.
- Multi-step application form (bio-data, credentials, program selection, declaration).
- Draft save + resume application flow for unstable network conditions.
- Application submission dashboard with status tracking (`DRAFT`, `SUBMITTED`, `UNDER_REVIEW`).
- Basic RBAC foundations for `APPLICANT` and `ADMIN`.

### APIs to Integrate
- **Remita TSA (mandatory in this sprint):**
  - Generate payment request (RRR flow).
  - Verify payment status.
  - Reconciliation endpoint/webhook handler.
- Internal APIs:
  - `/auth/*`, `/applications/*`, `/programs/*`, `/payments/remita/*`.

### Testing Requirements
- Unit tests for form validation, application workflow services, and payment verification logic.
- Integration tests for Remita adapter with mocked provider responses.
- API contract tests for applicant submission and payment status endpoints.
- Mobile network simulation tests (slow 3G/high latency) for form save/resume and retry behavior.
- Security tests for authentication, authorization, and rate limiting on payment endpoints.

---

## Sprint 2 (Weeks 3-4): SIS Core (Registration + Multi-Channel Payments)

### Features to Build
- Admission decision pipeline (`UNDER_REVIEW` -> `ADMITTED`/`REJECTED`) with audit trail.
- Student onboarding from admitted applications.
- Student profile and semester course registration module.
- Invoice generation for tuition/levies and payment ledger views.
- Role extensions: `STUDENT`, `STAFF`, `FINANCE`.

### APIs to Integrate
- **Paystack** integration for alternative payment channels.
- Continue Remita reconciliation jobs and exception handling.
- Internal APIs:
  - `/students/*`, `/registrations/*`, `/payments/*`, `/admin/admissions/*`.

### Testing Requirements
- End-to-end test: admitted applicant -> student creation -> invoice -> successful payment.
- Concurrency tests for registration slots during peak periods.
- Data integrity tests for payment-to-student/application linkage.
- Regression tests for Remita + Paystack coexistence.

---

## Sprint 3 (Weeks 5-6): Admin/Staff Portal + Result Processing

### Features to Build
- Admin portal for application screening queues and decision approvals.
- Staff workflows for course result upload, moderation, and publication.
- Result computation rules (grade points, GPA/CGPA snapshots).
- Audit logs for privileged actions and data changes.
- Granular RBAC and permission matrix enforcement.

### APIs to Integrate
- Internal APIs:
  - `/admin/screening/*`, `/results/*`, `/courses/*`, `/staff/*`.
- **Termii SMS/WhatsApp** notifications:
  - Admission outcome notifications.
  - Payment reminders.
  - Result publication alerts.

### Testing Requirements
- Permission matrix tests across all staff/admin endpoints.
- Result-processing validation tests (duplicate upload prevention, invalid grade guards).
- Notification delivery tests with retries and dead-letter queue handling.
- Accessibility tests (keyboard navigation, contrast, screen-reader labels) for admin forms.

---

## Sprint 4 (Weeks 7-8): Moodle Sync + Hardening + Go-Live Readiness

### Features to Build
- Moodle integration for course enrollment sync and grade exchange.
- Observability dashboards: API latency, payment success rates, queue lag, error rates.
- Performance hardening (DB indexing, caching, queue tuning, CDN/static caching).
- Disaster recovery playbook and backup verification routines.
- Production readiness artifacts (runbooks, incident response, security baseline).

### APIs to Integrate
- **Moodle APIs** for roster provisioning and grade synchronization.
- Finalized external integration monitoring:
  - Remita, Paystack, Termii, Moodle health checks.

### Testing Requirements
- Full-system end-to-end tests across applicant -> student -> payment -> result -> LMS sync.
- Load tests for admission and exam spikes (burst traffic scenarios).
- Security testing: RBAC bypass attempts, token misuse, brute-force/rate-limit checks.
- UAT sign-off with representative applicant/student/staff/admin personas.

## Cross-Sprint Non-Functional Requirements
- Mobile-first UI with strict performance budgets.
- Defensive APIs with pagination, retries, idempotency, and observability.
- RBAC and auditability built into every module, not deferred.
- Secure secrets management for external integrations and database credentials.
