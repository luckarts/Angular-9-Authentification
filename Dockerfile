


FROM node:12-alpine AS build_front

# couchbase sdk requirements
RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app/front

COPY angular/package*.json ./
RUN npm ci

COPY ./angular ./

RUN npm run build

# remove development dependencies
RUN npm prune --production

FROM node:12-alpine

# couchbase sdk requirements
RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app/serveur

COPY serveur/package*.json ./
RUN npm ci
COPY ./serveur ./
RUN npm run build

# remove development dependencies
RUN npm prune --production
COPY --from=build_front /usr/src/app/front/build ./build

CMD ["npm", "start"]
# build application

