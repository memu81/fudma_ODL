# FUDMA ODL Technical Architecture (Step 1 & Step 2)

## Step 1: Recommended Tech Stack

### Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- **Why Next.js:** Server-side rendering (SSR), static generation (SSG), and route-level code splitting help deliver fast first paint on low-bandwidth networks and improve SEO for the public website.
- **Why TypeScript:** Enforces contract safety between frontend and backend, reducing regressions in admissions/payment flows.
- **Why Tailwind CSS:** Lightweight utility-first styling enables smaller, maintainable UI bundles and fast mobile-first component development.
- **Key mobile optimizations:** responsive-first layouts, image optimization, caching with SWR/React Query patterns, and progressive enhancement for unstable network conditions.

### Backend: NestJS (Node.js, TypeScript)
- **Why NestJS:** Modular architecture suits multi-module systems (Applicant Portal, SIS, Admin Portal) and supports clear boundaries (auth, admissions, payments, results, notifications).
- **Scalability:** Stateless API services can be horizontally scaled during admission/exam traffic spikes.
- **Security readiness:** Built-in support for guards/interceptors makes RBAC, audit logging, rate limiting, and request validation straightforward.

### Database: PostgreSQL
- **Why PostgreSQL:** ACID guarantees for high-integrity transactional workflows (application submission, fee payments, result publication).
- **Relational fit:** ODL entities have strong relationships (students, programs, courses, payments, results) that need foreign keys and constraints.
- **Scale strategy:** Read replicas, partitioning (e.g., by academic session), and connection pooling for peak loads.

### ORM: Prisma
- **Why Prisma:** Type-safe client, migration management, and clear schema definitions reduce data layer errors and speed up team delivery.
- **Governance:** Strong migration discipline improves traceability and rollback safety for university compliance requirements.

### Supporting Components
- **Cache/Queue:** Redis + BullMQ for admission/exam burst handling, async jobs (SMS/WhatsApp notifications, payment reconciliation).
- **Reverse Proxy / Edge:** Nginx or managed ingress with compression and caching.
- **Observability:** OpenTelemetry + centralized logs + uptime/alerting.
- **Auth & RBAC:** JWT + refresh token rotation + role-based policies (`APPLICANT`, `STUDENT`, `STAFF`, `ADMIN`, `FINANCE`).
- **Integrations:**
  - **Payments:** Remita TSA (primary compliance path) + Paystack (alternate channels where allowed).
  - **Messaging:** Termii for SMS/WhatsApp notifications.
  - **LMS:** Moodle via secure API sync for enrolled students, course rosters, and grade exchange.

---

## Step 2: Scalable Monorepo Structure

```text
fudma_ODL/
├── apps/
│   ├── web/                         # Next.js public site + applicant/student frontend
│   │   └── README.md
│   └── api/                         # NestJS API gateway + domain modules
│       └── README.md
├── packages/
│   └── shared/                      # Shared types, DTO contracts, validation schemas
│       └── README.md
├── configs/                         # Shared linting/formatting/tsconfig/env templates
│   └── README.md
├── docs/
│   ├── TECHNICAL_ARCHITECTURE.md
│   └── IMPLEMENTATION_PLAN.md
├── prisma/
│   └── schema.prisma
├── scripts/
│   └── README.md
├── setup.sh
└── README.md
```

### Architectural Notes
- Keep external integrations behind dedicated adapters in the API service (`integrations/remita`, `integrations/paystack`, `integrations/termii`, `integrations/moodle`).
- Use domain modules in backend (`auth`, `admissions`, `students`, `payments`, `results`, `staff-admin`) to enforce bounded contexts.
- Centralize request validation and response contracts using shared schemas/types.
- Optimize for low bandwidth by default: gzip/brotli, pagination everywhere, lazy-loaded media, and compact API payloads.
