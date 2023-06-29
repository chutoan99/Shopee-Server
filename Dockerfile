FROM node:14
WORKDIR /app
COPY *.json .
COPY . .

CMD ["npm", "start"]
