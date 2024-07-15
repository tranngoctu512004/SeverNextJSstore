#* ✈️ Production 
FROM node:20-alpine AS dev

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

# Ensure has execute permission
RUN chmod +x app.js

USER node

RUN chown -R node:node /app/node_modules

RUN npm rebuild bcrypt --build-from-source

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
