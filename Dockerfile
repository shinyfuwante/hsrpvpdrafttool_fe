FROM node:21.4

ARG VITE_BACKEND_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]