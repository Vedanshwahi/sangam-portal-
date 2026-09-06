# ==========================================
# Sangam Portal — Production Multi-Stage Dockerfile
# ==========================================

# Stage 1: Build & compile dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Install native compilation toolchain required by better-sqlite3
RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm ci --omit=dev

# Stage 2: Minimal production runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/app/backend/data/sangam.db

# Create dedicated non-root application user
RUN addgroup -S sangam && adduser -S sangam -G sangam

# Copy node_modules from builder
COPY --from=builder --chown=sangam:sangam /app/node_modules ./node_modules
COPY --chown=sangam:sangam package*.json ./
COPY --chown=sangam:sangam backend ./backend
COPY --chown=sangam:sangam public ./public

# Create database persistence volume directory with proper permissions
RUN mkdir -p /app/backend/data && chown -R sangam:sangam /app/backend/data

USER sangam

EXPOSE 3000

# Built-in container healthcheck probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "backend/src/server.js"]
