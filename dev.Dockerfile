FROM node:20-alpine

WORKDIR /app

# Устанавливаем зависимости один раз в образ
COPY package*.json ./
RUN npm ci

# Остальной код будет смонтирован томом в compose
EXPOSE 5001

CMD ["npm", "run", "dev"]
