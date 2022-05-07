FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn global add ts-node
#add app
COPY . .
EXPOSE 3000

CMD ["yarn","run","dev"]
