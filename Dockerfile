FROM node:12-alpine

COPY . .

RUN npm i -g yarn
RUN yarn && yarn build
CMD [ "yarn", "start:prod" ]