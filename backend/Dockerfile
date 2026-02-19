FROM node:20-alpine

WORKDIR /app

# Copy everything first (including prisma/schema.prisma)
COPY . .

# Install dependencies + generate Prisma client
RUN npm ci && npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 5000

CMD ["npm", "run", "start"]