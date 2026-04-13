FROM node:20-alpine

WORKDIR /app

# apk is much faster than apt and the alpine base image is smaller
RUN apk add --no-cache git

COPY . .

EXPOSE 8080

CMD ["node", "scripts/static-supervisor.js"]
