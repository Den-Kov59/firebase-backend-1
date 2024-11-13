FROM node:20.17.0-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY / .

RUN  npm i

EXPOSE 8080

CMD ["npm", "start"]