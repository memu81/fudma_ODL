# FUDMA ODL Monorepo Scaffold

Initial scaffold for an end-to-end Open and Distance Learning (ODL) platform focused on:
- Mobile-first usage and low-bandwidth reliability
- Secure RBAC and auditable operations
- Integration with Remita TSA, Paystack, Termii, and Moodle

## Selected Core Stack
- **Frontend:** Next.js (TypeScript)
- **Backend:** NestJS (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Queue/Cache:** Redis + BullMQ (implementation phase)

## Monorepo Layout
```text
fudma_ODL/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── configs/
├── docs/
│   ├── TECHNICAL_ARCHITECTURE.md
│   └── IMPLEMENTATION_PLAN.md
├── prisma/
│   └── schema.prisma
├── scripts/
├── setup.sh
└── package.json
```

## Quick Start
```bash
chmod +x setup.sh
./setup.sh
```

## Sprint 1 Demo Credentials
- Applicant login:
  - `email: applicant@fudma.edu.ng`
  - `password: Password123!`
- Admin login:
  - `email: admin@fudma.edu.ng`
  - `password: Password123!`

## Manual Setup Commands
```bash
# 1) Install root/workspace dependencies
npm install

# 2) Create local env file
cp .env.example .env

# 3) Generate Prisma client
npx prisma generate

# 4) Run development servers
npm run dev
```

## Sprint 1 API Endpoints (Scaffold)
- Auth:
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/profile`
- Programs:
  - `GET /api/v1/programs` (public)
- Applications:
  - `POST /api/v1/applications/draft`
  - `PATCH /api/v1/applications/:id/submit`
  - `GET /api/v1/applications/mine`
  - `GET /api/v1/applications/admin`
  - `GET /api/v1/applications/:applicationNumber`
- Remita:
  - `POST /api/v1/payments/remita/initiate`
  - `GET /api/v1/payments/remita/verify/:rrr`
  - `POST /api/v1/payments/remita/webhook` (public)

## Reference Docs
- Architecture & stack rationale: `docs/TECHNICAL_ARCHITECTURE.md`
- Sprint roadmap: `docs/IMPLEMENTATION_PLAN.md`
- Data model: `prisma/schema.prisma`