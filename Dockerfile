FROM node:16 As development

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package*.json ./

COPY yarn*.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn","serve:prod" ]