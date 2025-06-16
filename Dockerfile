# Build Stage
FROM node:20-alpine3.22 AS build
WORKDIR /app
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
