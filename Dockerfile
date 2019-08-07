FROM node:11

RUN npm install -g truffle typescript prettier

WORKDIR /src

EXPOSE 8080
ENTRYPOINT []
