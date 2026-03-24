# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build arguments for environment variables
ARG PUBLIC_MESSAGE_ROUTER_URL
ARG PUBLIC_MESSAGE_ROUTER_API_KEY

# Set environment variables for the build process
ENV PUBLIC_MESSAGE_ROUTER_URL=${PUBLIC_MESSAGE_ROUTER_URL}
ENV PUBLIC_MESSAGE_ROUTER_API_KEY=${PUBLIC_MESSAGE_ROUTER_API_KEY}

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Remove any .env files to prevent conflicts with build args
RUN rm -f .env .env.production .env.local

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
