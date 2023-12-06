## Projeto Talk for a Cause

Foi interessante realizar esse projeto pois pude me debruçar ainda mais em tecnologias que já utilizo no dia a dia de trabalho. A integração com o socket foi bem desafiadora, mas consegui o resultado que gostaria. Único problema é que no deploy realizado do back-end a conexão com o socket não é autorizada, fiz o deploy de forma gratuita tanto na Vercel, quanto na Railway, ambas tive o mesmo problema.

Por conta disso como melhorias para o projeto penso em melhorar e estudar um pouco mais da infraestrutura que ele ficará aplicado, buscando trabalhar com Docker e Redis para manutenção da aplicação.

Sobre o projeto, ele consiste numa aplicação simples de chat, onde usuários podem conversar numa sala de conversa. Para isso, foram utilizados os frameworks Nest.js no back-end e Next.js no Front-end, ambos utilizando typescript como linguagem. No projeto pode-se encontrar um fluxo de autenticação com base em JWT para proteção das rodas do back-end. No front-end encontra-se telas de login e cadastro para autenticação do usuário e acesso ao chat da aplicação.

# Tecnologias Utilizadas

- Nest.js
- Next.js
- Yup
- Context API
- Zustand
- Prisma
- PostgreSQL
- React-Hook-Form
- Axios
- React-Toastify
- Socket.IO
- Dayjs
- Tailwind.css

## Como rodar o projeto

Para testar o projeto e o socket pode-se abrir o projeto e realizar os seguintes passos:

- Front-End
  cd /chat-frontend

env=http://localhost:3333

yarn

yarn dev

- Back-end

cd /chat-backend

Env:
PORT=3333
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=myschema
JWT_ACCESS_TOKEN_SECRET=seuToken

yarn

yarn build

yarn start:dev
