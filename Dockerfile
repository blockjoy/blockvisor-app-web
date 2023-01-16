FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
ARG NPM_TOKEN
COPY package.json yarn.lock ./
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ./.npmrc
RUN yarn install
RUN rm -f ./.npmrc
USER node


FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_VERCEL_ENV
ARG NEXT_PUBLIC_SUPPORT_EMAIL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ORG_ID
ARG NEXT_PUBLIC_LOADING_DURATION
ARG NEXT_PUBLIC_SHORT_SHA

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_SHORT_SHA=develop
ENV NEXT_PUBLIC_BUILD_VERSION=$NEXT_PUBLIC_SHORT_SHA

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]