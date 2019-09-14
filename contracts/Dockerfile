FROM node:12

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm i

COPY . /app

CMD ["npm", "run", "sys:start-prod-api-server"]
