FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm init -y && npm install express cors dotenv pg bcryptjs
CMD ["node", "app.js"]
