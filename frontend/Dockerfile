# frontend/Dockerfile
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source code
COPY . .

# Expose frontend dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
