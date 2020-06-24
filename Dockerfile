FROM node:12.14.0-alpine3.10 as builder

EXPOSE 80

COPY .. /app
WORKDIR /app
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html
