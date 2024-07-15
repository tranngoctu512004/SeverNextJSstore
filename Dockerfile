#* ✈️ Production 
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

RUN chmod +x index.js

EXPOSE 3500

CMD [ "npm", "run", "dev" ]