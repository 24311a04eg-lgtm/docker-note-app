# syntax=docker/dockerfile:1.4

FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN --mount=type=cache,target=/root/.npm \
    npm install --production --cache /root/.npm

FROM node:18-slim

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN useradd -m appuser && chown -R appuser /app

USER appuser

EXPOSE 3000

CMD ["npm", "start"]