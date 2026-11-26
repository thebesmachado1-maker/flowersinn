FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm init -y && npm install express cors dotenv pg bcryptjs

# Si tu archivo principal está en src/app.js, deja esta línea:
CMD ["node", "src/app.js"]

# (Si en su lugar tu archivo está en /app/app.js, cambia la línea anterior por: CMD ["node", "app.js"])
