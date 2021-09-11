FROM node:14.17.0-alpine

WORKDIR /usr/src/backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN cd ./build/

CMD ["node", "index.js"]
