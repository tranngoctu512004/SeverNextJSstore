#* ✈️ Production 
FROM node:20-alpine AS dev

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

# Ensure has execute permission
RUN chmod +x app.js

USER root

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
