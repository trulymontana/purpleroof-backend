FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY secrets ./secrets/

RUN npm install

RUN npx prisma generate

COPY . .

ENV DATABASE_URL 'mysql://root:BH61BEba11232-gbgabbCF-6-DHDe2C4@roundhouse.proxy.rlwy.net:22165/purpleroof_production?schema=public'
ENV PORT 4000
ENV S3_BUCKET purpleroof
ENV S3_REGION eu-north-1
ENV AWS_ACCESS_KEY_ID AKIAWCN35ZQWZPQIXA6R
ENV AWS_SECRET_ACCESS_KEY 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

EXPOSE 4000

RUN npm run build

CMD [ "node", "dist/main.js" ]
