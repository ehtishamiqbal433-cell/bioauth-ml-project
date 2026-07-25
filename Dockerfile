# --- Stage 1: Build Frontend / Environment ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# --- Stage 2: Production Runtime ---
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
