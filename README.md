# Front-end - Sistema de Gestão Comercial

Front-end estático em HTML, CSS e JavaScript para um projeto Java/Spring.

## Novidades desta versão

- Tela de login
- Botão de sair
- Cadastro de clientes, produtos e vendas
- Listagem em tabelas
- Exclusão de registros
- Alteração/edição de registros
- Layout responsivo

## Login de teste

```text
Usuário: admin
Senha: 1234
```

## Como usar

Abra o arquivo `index.html` no navegador.

## Estrutura

```text
frontend/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Conexão futura com Spring Boot

No arquivo `script.js`, altere a URL da API:

```js
const API_BASE_URL = "http://localhost:8080/api";
```

Endpoints recomendados:

```text
GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/{id}
DELETE /api/clientes/{id}

GET    /api/produtos
POST   /api/produtos
PUT    /api/produtos/{id}
DELETE /api/produtos/{id}

GET    /api/vendas
POST   /api/vendas
PUT    /api/vendas/{id}
DELETE /api/vendas/{id}
```

Atualmente os dados ficam apenas em memória enquanto a página está aberta.
