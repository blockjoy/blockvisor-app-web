FROM node:16-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_VERCEL_ENV
ARG NEXT_PUBLIC_SUPPORT_EMAIL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MQTT_URL
ARG NEXT_PUBLIC_SHORT_SHA
ARG NEXT_PUBLIC_PLAUSIBLE_DATA_DOMAIN
ARG NEXT_PUBLIC_CRISP_WEBSITE_ID
ARG CRISP_API_URL
ARG CRISP_TOKEN_IDENTIFIER
ARG CRISP_TOKEN_KEY
ARG CRISP_FAQ_CATEGORY_ID

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]