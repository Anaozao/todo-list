# Usa a imagem node:18 como base
FROM node:18
# Muda para o diretório de trabalho /app-frontend
WORKDIR /app-frontend
# Copia os package.json e package-lock.json para o container
COPY ./package*.json ./
# Instala as dependências Node
RUN npm install
# Copia o restante dos arquivos da aplicação para o container
COPY . .
# A aplicação expõe a porta 3001
EXPOSE 5173
# Configura os comandos para iniciar a aplicação
CMD ["npm", "run", "dev"]