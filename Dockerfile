FROM node:20-alpine

# Installs latest Chromium (100) package.
# RUN apk add --no-cache \
#       chromium \
#       nss \
#       freetype \
#       harfbuzz \
#       ca-certificates \
#       ttf-freefont \
#       nodejs \
#       yarn
 
# # Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
 
# Puppeteer v13.5.0 works with Chromium 100.


WORKDIR /usr/src/app

USER root

COPY package*.json ./

COPY prisma ./prisma/

# COPY secrets ./secrets/
COPY assets ./assets/

RUN npm install


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
