### STAGE 1: Build ###
FROM node:14.17.0-alpine AS build

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.21.3-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/todo /usr/share/nginx/html

EXPOSE 80
