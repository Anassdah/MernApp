FROM node:lts-alpine
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
#add app
COPY . .

EXPOSE 3000

CMD ["yarn","start"]
