FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

# COPY secrets ./secrets/
COPY assets ./assets/

RUN npm install

RUN sudo apt-get install chromium-browser

RUN npx prisma generate

COPY . .

ARG DATABASE_URL
ARG PORT 
ARG S3_BUCKET_NAME  
ARG AWS_REGION
ARG S3_ACCESS_KEY 
ARG S3_SECRET_ACCESS_KEY


EXPOSE 4000

RUN sudo apt-get install chromium-browser

RUN npm run build

CMD [ "node", "dist/main.js" ]
