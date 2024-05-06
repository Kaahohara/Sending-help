FROM node:21-alpine

WORKDIR ./

COPY package*.json ./

RUN npm install
RUN npm install -g npm@10.6.0

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "serve" ]