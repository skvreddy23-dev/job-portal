FROM node:20-alpine

# Install OpenSSL 1.1
RUN apk add --no-cache openssl1.1-compat

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "src/index.js"]
