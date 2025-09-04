# syntax=docker/dockerfile:1

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev deps for build)
RUN npm ci --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Generate Swagger documentation
RUN npm run swagger

# Build TypeScript code
RUN npm run build

# Ensure functionsDatabases is copied to dist
RUN if [ -d "src/config/functionsDatabases" ]; then \
      mkdir -p dist/src/config && \
      cp -r src/config/functionsDatabases dist/src/config/; \
    fi

# Copy swagger-output.json to dist
RUN cp swagger-output.json dist/

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production --frozen-lockfile && \
    npm cache clean --force

# Generate Prisma Client for production
RUN npx prisma generate

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy docker entrypoint script
COPY docker-entrypoint.sh ./docker-entrypoint.sh

# Create logs directory and set permissions
RUN mkdir -p logs && \
    chmod +x ./docker-entrypoint.sh && \
    chown -R appuser:nodejs /app

USER appuser

# Expose port
EXPOSE 3020

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3020/health || exit 1

# Start application
CMD ["./docker-entrypoint.sh"]