FROM alpine:3.11 AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs nodejs-npm 
COPY package.json  ./
ARG CACHEBUST=1
RUN npm i exception-handler@0.0.8 node-aop@^1.1.5 typescript@^3.9.7 depd@2.0.0  @types/paypal-rest-sdk@^1.7.6 --registry https://nexus.altorumleren.com/repository/npm-node/
RUN npm i  mongoose@^6.1.3  razorpay@^2.8.1 --registry https://registry.npmjs.org
ARG CACHEBUST=1
RUN npm get registry
RUN npm install --save-exact
ARG CACHEBUST=1
COPY . .
ARG CACHEBUST=1
#RUN  npx tsc
RUN npx -p typescript tsc
RUN ls


FROM alpine
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs \
    && rm -rf /var/cache/apk/*
ARG CACHEBUST=1
COPY --from=builder /usr/src/app/dist ./dist
ARG CACHEBUST=1
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
#CMD  ["node","dist/src/server.js"]
EXPOSE 3000