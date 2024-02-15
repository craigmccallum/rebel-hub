FROM node:lts-alpine

RUN mkdir -p /api-gateway-service

WORKDIR /api-gateway-service

COPY . .

CMD npm run build; npm run serve
