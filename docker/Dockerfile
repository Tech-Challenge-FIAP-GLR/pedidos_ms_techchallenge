FROM node:16

WORKDIR /pedidos_ms_db-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start