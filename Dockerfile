FROM node:20-alpine

WORKDIR /usr/src/app

USER root

# Install dependencies for Puppeteer
RUN apk --no-cache add \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

COPY package*.json ./

COPY prisma ./prisma/

# COPY secrets ./secrets/
COPY assets ./assets/

RUN npm install

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npx prisma generate

COPY . .

ARG DATABASE_URL
ARG PORT 
ARG S3_BUCKET_NAME  
ARG AWS_REGION
ARG S3_ACCESS_KEY 
ARG S3_SECRET_ACCESS_KEY

EXPOSE 4000

RUN npm run build

CMD [ "node", "dist/main.js" ]