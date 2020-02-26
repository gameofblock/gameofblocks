FROM node:alpine

RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install [ your npm dependencies here ] \
    && apk del .gyp