FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache openssl

##### BUILDER

FROM base AS builder
ARG APP
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker

##### INSTALLER

FROM base AS installer
ARG APP
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN cd apps/backend && pnpm build ${APP}

RUN pnpm prune --prod

##### RUNNER

FROM base AS runner
ARG APP
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer /app/apps/backend/dist ./apps/backend/dist
COPY --from=installer /app/apps/backend/generated ./apps/backend/generated
COPY --from=installer /app/apps/backend/prisma ./apps/backend/prisma

WORKDIR /app/apps/backend

EXPOSE 8000 8001
ENV APP=${APP}

ENTRYPOINT ["dumb-init", "--"]

CMD sh -c "node dist/apps/${APP}/main.js"
