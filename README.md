# 🕹️ Loja de Games API

Uma API REST desenvolvida com **NestJS**, **TypeORM** e **MySQL**, que permite gerenciar produtos e categorias de uma loja de games.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework para Node.js
- [TypeORM](https://typeorm.io/) - ORM para banco de dados
- [MySQL](https://www.mysql.com/) - Banco de dados relacional
- [class-validator](https://github.com/typestack/class-validator) - Validação de dados

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/larissa-pinheiro/gamestore-backend.git
cd gamestore-backend

# Instale as dependências
npm install

# Modo de desenvolvimento
npm run start:dev

# Compilar
npm run build
```

## 📚 Endpoints principais

### 📁 Categorias

| Método | Rota                       | Descrição                          |
|--------|----------------------------|------------------------------------|
| GET    | `/categorias`              | Lista todas as categorias          |
| GET    | `/categorias?nome=rpg`     | Busca categorias por nome          |
| GET    | `/categorias/:id`          | Busca categoria por ID             |
| POST   | `/categorias`              | Cria uma nova categoria            |
| PUT    | `/categorias/:id`          | Atualiza uma categoria existente   |
| DELETE | `/categorias/:id`          | Remove uma categoria               |

### 🎮 Produtos

| Método | Rota                      | Descrição                         |
|--------|---------------------------|-----------------------------------|
| GET    | `/produtos`               | Lista todos os produtos           |
| GET    | `/produtos?nome=god`      | Busca produtos por nome           |
| GET    | `/produtos/:id`           | Busca produto por ID              |
| POST   | `/produtos`               | Cria um novo produto              |
| PUT    | `/produtos/:id`           | Atualiza um produto existente     |
| DELETE | `/produtos/:id`           | Remove um produto                 |

## 📥 Exemplo de criação de produto (POST /produtos)  

```
{
  "nome": "God of War Ragnarok",
  "preco": 299.90,
  "descricao": "Jogo épico de ação",
  "imagem": "https://exemplo.com/imagem.jpg",
  "categoria": {
    "id": 1
}
```
