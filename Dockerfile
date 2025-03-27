FROM node:18.15

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install
ENV VITE_API_ROUTE=https://update.fancypastryacademy.com/
RUN npm run build

CMD  npm run preview --host
