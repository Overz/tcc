# STAGE 1
FROM node:14-alpine as builder

WORKDIR /app

ADD package*.json ./
ADD .npmrc .

ADD . .

RUN npm install && npm run build

# STAGE 2
FROM node:14-alpine

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

WORKDIR /app

COPY --from=builder /app/build /app/
COPY --from=builder /app/ormconfig.prod.json /app/ormconfig.json
COPY --from=builder /app/package*.json /app/

RUN npm i --only=prod && npm i ts-node

# ENTRYPOINT [ "npm", "run", "db:migrate" ]

CMD [ "npm", "start" ]
