FROM node:22-alpine AS base

# Dépendances nécessaires pour Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Dépendances de développement
FROM base AS deps
# Copier le dossier prisma en premier pour que prisma generate fonctionne
COPY prisma ./prisma
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour le build
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Construction de l'application
RUN npm run build

# Image de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Utilisation des traces pour optimiser la taille de l'image
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Variables d'environnement pour l'exécution
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]