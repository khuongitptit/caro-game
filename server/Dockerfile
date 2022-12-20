FROM node:16 As development

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package*.json ./

COPY yarn*.lock ./

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]
