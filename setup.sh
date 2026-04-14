#!/usr/bin/env bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required (recommended: v20 LTS)."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required."
  exit 1
fi

echo "[1/5] Installing workspace dependencies..."
npm install

echo "[2/5] Creating .env from template if missing..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
else
  echo ".env already exists; leaving as-is"
fi

echo "[3/5] Generating Prisma client..."
npx prisma generate

echo "[4/5] Optional: Run database migrations when DB is ready"
echo "Command: npx prisma migrate dev --name init"

echo "[5/5] Starting development servers..."
npm run dev
