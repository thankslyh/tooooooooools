# build阶段
FROM node:20.14.0-alpine3.20 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 3000

# CMD [ "node", "./dist/main.js" ]

# production stage
FROM node:20.14.0-alpine3.20 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/.env /app/.env

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "/app/main.js"]
