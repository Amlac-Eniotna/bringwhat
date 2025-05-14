FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Copier le dossier prisma AVANT l'installation des dépendances
COPY prisma ./prisma

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
elif [ -f package-lock.json ]; then npm ci; \
elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
fi

# Adjust the files and folders that should be copied to the build container
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY next.config.ts .
COPY components.json .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY postcss.config.mjs .

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]