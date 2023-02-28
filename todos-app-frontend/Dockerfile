FROM node:16-alpine

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "serve", "--host", "0.0.0.0", "--port", "8080"]