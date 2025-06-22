# back_agendamentos_aula

Claro! Aqui está um exemplo de **descrição para o repositório do GitHub** do seu projeto de agendamento de salas, incluindo as tecnologias utilizadas e funcionalidades previstas:

---

## 🗓️ Agenda de Salas — Backend

API RESTful desenvolvida em **Node.js** com **Express**, utilizando **Sequelize** como ORM e **MySQL** como banco de dados relacional. Este projeto faz parte de um sistema de agendamento de salas, ideal para empresas, escolas, coworkings e outras instituições que desejam gerenciar o uso de seus espaços de forma eficiente.

---

### 🚀 Tecnologias

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://nodemon.io/) (dev)

---

### ✅ Funcionalidades da API

#### Usuários (Users)

* Criar conta de usuário
* Listar todos os usuários
* Atualizar dados do usuário
* Deletar usuário

#### Salas (Rooms)

* Criar nova sala
* Listar salas disponíveis
* Atualizar informações de uma sala
* Remover uma sala

#### Agendamentos (Bookings)

* Criar novo agendamento de sala
* Validar conflito de horários
* Listar agendamentos por sala, usuário ou data
* Cancelar ou deletar um agendamento

#### Autenticação (futuramente)

* Login com e-mail e senha
* Middleware de autenticação usando JWT (planejado)

---

### 📂 Estrutura do Projeto

```
├── config/         # Configuração do Sequelize e banco de dados
├── controllers/    # Lógica das rotas (CRUD)
├── models/         # Modelos do Sequelize
├── routes/         # Rotas da API
├── app.js          # Arquivo principal
├── .env            # Variáveis de ambiente
└── package.json
```

---

### ⚙️ Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/agenda-salas-backend.git
cd agenda-salas-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=agenda_salas
DB_PORT=3306
```

4. Inicie o servidor:

```bash
npm run dev
```

---

