FROM node:14.17.0-alpine

WORKDIR /usr/src/backend

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN apk update && apk add bash

COPY . .

RUN npm run build

EXPOSE 5000

WORKDIR /usr/src/backend/build/

CMD ["index.js"]
