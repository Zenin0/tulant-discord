FROM node:20-alpine

WORKDIR /app

# Install build dependencies
COPY package*.json ./

# Optional: include .npmrc if needed
# COPY .npmrc ./

RUN npm install --production

# Copy rest of the files
COPY . .

CMD ["node", "index.js"]
