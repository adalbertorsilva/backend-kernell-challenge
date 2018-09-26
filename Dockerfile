FROM node:carbon-alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]