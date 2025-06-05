# Usar uma imagem Node.js como base
FROM node:18-alpine

# Criar diretório da aplicação
WORKDIR /app

# Copiar package.json e package-lock.json
COPY backend/package*.json .

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY /backend .

# Comando para iniciar a aplicação
CMD ["npm", "start"]