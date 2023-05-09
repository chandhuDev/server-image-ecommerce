FROM node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN ls

EXPOSE 5000

CMD ["npm","start"]