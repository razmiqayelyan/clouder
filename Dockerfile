FROM node

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "backend/index.js" ]