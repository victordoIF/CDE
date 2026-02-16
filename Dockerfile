FROM node:20-alpine

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

RUN mkdir -p /app/data

EXPOSE 3000 

HEALTHCHECK CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["npm", "start"]