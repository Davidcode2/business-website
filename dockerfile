# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Build arguments for environment variables
ARG PUBLIC_MESSAGE_ROUTER_URL
ARG PUBLIC_MESSAGE_ROUTER_API_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
