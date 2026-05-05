💰 Backend em TypeScript - Controle Financeiro
API desenvolvida como parte de um treinamento no curso DevClub, utilizando TypeScript e Prisma ORM para integração com banco de dados MongoDB. Este backend fornece os serviços necessários para o frontend de controle financeiro, incluindo autenticação e gerenciamento de despesas por mês e categorias.

🚀 Tecnologias Utilizadas
Node.js

TypeScript

Prisma ORM

MongoDB

Express.js (ou Fastify, conforme configuração)

Axios (para comunicação externa, se necessário)

⚙️ Instalação e Execução
Clone o repositório:

bash
git clone https://github.com/fabiogarcia-dev/Controle_financeiro_mongoDB_BackEnd-API-.git
Instale as dependências:

bash
npm install
Configure o banco de dados MongoDB (local ou via Docker).

Crie o arquivo .env com as variáveis de ambiente:

Código
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/devbills"
PORT=3000
Execute as migrações do Prisma:

bash
npx prisma migrate dev
Inicie o servidor:

bash
npm run dev
📖 Uso
O backend expõe endpoints REST para cadastro e gerenciamento de despesas.

Autenticação integrada com Firebase (via frontend).

Os dados são persistidos no banco MongoDB através do Prisma.

Exemplo de requisição:

bash
POST /api/despesas
{
  "categoria": "Alimentação",
  "valor": 150.00,
  "data": "2026-05-04",
  "usuarioId": "123456"
}
✨ Funcionalidades
CRUD de despesas financeiras.

Organização por mês e categoria.

Integração com autenticação via Firebase.

Persistência de dados com Prisma + MongoDB.

🛠️ Estrutura do Projeto
Código
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── prisma/
 │    └── schema.prisma
 ├── utils/
 ├── app.ts
 └── server.ts
