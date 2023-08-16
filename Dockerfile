FROM node:16-alpine

RUN mkdir -p /usr/src/tilka-app && chown -R node:node /usr/src/tilka-app

WORKDIR /usr/src/tilka-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
