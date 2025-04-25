# 🐾 Pet Finder Amigo - Sistema de Adoção de Pets

Um sistema completo para adoção de pets, desenvolvido com React, Node.js e MongoDB. O projeto foi criado com a ajuda do [Lovable](https://lovable.dev) para o design das interfaces.

## 🚀 Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (instalado localmente ou MongoDB Atlas)
- NPM ou Yarn

## 🔧 Instalação

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do backend
- Adicione as seguintes variáveis:
```
PORT=3000
MONGODB_URI=sua_url_do_mongodb
JWT_SECRET=seu_segredo_jwt
```

4. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 🌟 Funcionalidades

- Cadastro e autenticação de usuários
- Perfil de usuário com informações para adoção
- Listagem de pets disponíveis para adoção
- Detalhes completos de cada pet
- Sistema de solicitação de adoção
- Painel administrativo para funcionários
- Gerenciamento de status de adoções
- Upload de fotos de pets

## 👥 Perfis de Usuário

### Usuário Comum
- Visualizar pets disponíveis
- Solicitar adoção
- Gerenciar perfil
- Acompanhar solicitações

### Funcionário
- Gerenciar pets
- Aprovar/rejeitar solicitações
- Cadastrar novos pets
- Editar informações de pets

## 🎨 Design

O design do projeto foi desenvolvido com a ajuda do [Lovable](https://lovable.dev), uma plataforma que oferece componentes e interfaces modernas para aplicações web.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

[Seu Nome] - [Seu GitHub]

## 🙏 Agradecimentos

- [Lovable](https://lovable.dev) pelo design das interfaces
- Todos os contribuidores do projeto
