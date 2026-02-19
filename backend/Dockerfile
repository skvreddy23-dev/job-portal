# backend/Dockerfile
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all backend code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "run", "start"]
