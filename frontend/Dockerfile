FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma generate
RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 5173
CMD ["npm", "run", "dev"]
