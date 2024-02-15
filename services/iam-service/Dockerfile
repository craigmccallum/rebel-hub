FROM node:lts-alpine

RUN mkdir -p /iam-service

WORKDIR /iam-service

COPY . .

CMD npm run build && npm run prisma:push && npm run prisma:generate && npm run serve
