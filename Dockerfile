FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm config set fetch-retries 5 \
  && pnpm config set fetch-timeout 600000 \
  && pnpm config set network-concurrency 8 \
  && pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
RUN npx prisma generate
RUN npm run build
RUN pnpm prune --prod

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/data ./data
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/scripts/docker-entrypoint.mjs ./scripts/docker-entrypoint.mjs
COPY --from=builder /app/scripts/create-admin.mjs ./scripts/create-admin.mjs

RUN mkdir -p /app/public/uploads/blog

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "scripts/docker-entrypoint.mjs"]
