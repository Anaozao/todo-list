Este projeto se trata de uma "lista de tarefas".

Front-End feito em React.js + Vite

Back-End Feito em TypeScript, utilizando o Node.js + Express para criação da API e seus endpoints.

Para o Banco de dados foi utilizado o MySQL + Sequelize.

Para criação e validação de tokens foi utilizado o JSON Web Token

Para envio de email foi utilizado o Nodemailer

Para utilizar o projeto localmente:

Faça o clone do repositório na sua máquina
  - Crie um arquivo .env no diretório "backend" e defina as variáveis de ambiente de acordo com o arquivo .env.example
  - Acesse a diretório "backend" e utilize o comando "npm install" e depois "npm run dev"
  - Crie um arquivo .env no diretório "frontend" e defina as variáveis de ambiente de acordo com o arquivo .env.example
  - Acesse o diretório "frontend" e utilize o comando "npm install" e depois "npm run dev", e verifique no terminal o link para abrir a aplicação no browser.
  - Para rodar a aplicação via Docker:

Faça o clone do repositório na sua máquina
  - Crie um arquivo .env no diretório "backend" e defina as variáveis de ambiente de acordo com o arquivo .env.example
  - Crie um arquivo .env no diretório "frontend" e defina as variáveis de ambiente de acordo com o arquivo .env.example
  - Na raíz do projeto, utilize o comando "docker-compose up -d --build" ou "docker compose up -d --build"