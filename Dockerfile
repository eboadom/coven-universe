# First step: Build client with Node.js
FROM node:12 AS Builder-client
WORKDIR /app
COPY . /app
WORKDIR /app/client
RUN npm i install
RUN npm run build

# Second step: Setup server
FROM node:12 as Builder-server
WORKDIR /app/contracts
RUN npm i -g truffle typescript ts-node prettier nodemon
RUN npm i

# Deliver the dist folder with Nginx
FROM nginx
WORKDIR /app
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder-client /app/client/dist /usr/share/nginx/html
COPY ./scripts/nginx_entrypoint.sh /

CMD ["/nginx_entrypoint.sh"]