FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache openssl

##### BUILDER

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker

##### INSTALLER
FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN cd apps/backend && pnpm build && pnpm build:user

RUN pnpm prune --prod

##### RUNNER

FROM base AS runner
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer /app/packages/responses ./packages/responses
COPY --from=installer /app/apps/backend/dist ./apps/backend/dist
COPY --from=installer /app/apps/backend/generated ./apps/backend/generated
COPY --from=installer /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=installer /app/apps/backend/start.sh ./apps/backend/start.sh

WORKDIR /app/apps/backend

# Make start.sh executable
RUN chmod +x start.sh

# Expose ports (8000 for API Gateway, 8001 for User microservice)
EXPOSE 8000 8001

ENTRYPOINT ["dumb-init", "--"]

# Run both services using the startup script
CMD ["sh", "start.sh"]
