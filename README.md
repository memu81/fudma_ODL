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

## Reference Docs
- Architecture & stack rationale: `docs/TECHNICAL_ARCHITECTURE.md`
- Sprint roadmap: `docs/IMPLEMENTATION_PLAN.md`
- Data model: `prisma/schema.prisma`