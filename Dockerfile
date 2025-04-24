# build the react app
FROM node:20-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Server with Ngiinx
FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /appp/build .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;"]
