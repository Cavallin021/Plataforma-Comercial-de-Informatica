const API_BASE_URL = "http://localhost:8080/api";

let clientes = [];
let produtos = [];
let vendas = [];

const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");
const formLogin = document.getElementById("form-login");
const loginErro = document.getElementById("login-erro");

const sections = document.querySelectorAll(".section");
const navButtons = document.querySelectorAll(".nav-btn");
const pageTitle = document.getElementById("page-title");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = document.getElementById("login-usuario").value;
  const senha = document.getElementById("login-senha").value;

  if (usuario === "admin" && senha === "1234") {
    loginErro.textContent = "";
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
  } else {
    loginErro.textContent = "Usuário ou senha inválidos.";
  }
});

document.getElementById("btn-sair").addEventListener("click", () => {
  appScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  formLogin.reset();
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionName = button.dataset.section;

    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    sections.forEach((section) => section.classList.remove("active"));
    document.getElementById(sectionName).classList.add("active");

    pageTitle.textContent = button.textContent;
  });
});

// CLIENTES
document.getElementById("form-cliente").addEventListener("submit", (event) => {
  event.preventDefault();

  const index = document.getElementById("cliente-index").value;
  const cliente = {
    nome: document.getElementById("cliente-nome").value,
    email: document.getElementById("cliente-email").value,
    telefone: document.getElementById("cliente-telefone").value,
  };

  if (index === "") {
    clientes.push(cliente);
  } else {
    clientes[index] = cliente;
  }

  limparFormularioCliente();
  renderizarClientes();
  atualizarDashboard();
});

document.getElementById("cancelar-cliente").addEventListener("click", limparFormularioCliente);

function editarCliente(index) {
  const cliente = clientes[index];

  document.getElementById("cliente-index").value = index;
  document.getElementById("cliente-nome").value = cliente.nome;
  document.getElementById("cliente-email").value = cliente.email;
  document.getElementById("cliente-telefone").value = cliente.telefone;

  document.getElementById("titulo-form-cliente").textContent = "Alterar Cliente";
  document.getElementById("btn-cliente").textContent = "Salvar Alterações";
  document.getElementById("cancelar-cliente").classList.remove("hidden");
}

function limparFormularioCliente() {
  document.getElementById("form-cliente").reset();
  document.getElementById("cliente-index").value = "";
  document.getElementById("titulo-form-cliente").textContent = "Cadastrar Cliente";
  document.getElementById("btn-cliente").textContent = "Salvar Cliente";
  document.getElementById("cancelar-cliente").classList.add("hidden");
}

function renderizarClientes() {
  const tbody = document.getElementById("lista-clientes");

  if (clientes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty">Nenhum cliente cadastrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = clientes.map((cliente, index) => `
    <tr>
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefone}</td>
      <td>
        <button class="btn-edit" onclick="editarCliente(${index})">Alterar</button>
        <button class="btn-danger" onclick="removerCliente(${index})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

function removerCliente(index) {
  clientes.splice(index, 1);
  limparFormularioCliente();
  renderizarClientes();
  atualizarDashboard();
}

// PRODUTOS
document.getElementById("form-produto").addEventListener("submit", (event) => {
  event.preventDefault();

  const index = document.getElementById("produto-index").value;
  const produto = {
    nome: document.getElementById("produto-nome").value,
    preco: Number(document.getElementById("produto-preco").value),
    estoque: Number(document.getElementById("produto-estoque").value),
  };

  if (index === "") {
    produtos.push(produto);
  } else {
    produtos[index] = produto;
  }

  limparFormularioProduto();
  renderizarProdutos();
  atualizarDashboard();
});

document.getElementById("cancelar-produto").addEventListener("click", limparFormularioProduto);

function editarProduto(index) {
  const produto = produtos[index];

  document.getElementById("produto-index").value = index;
  document.getElementById("produto-nome").value = produto.nome;
  document.getElementById("produto-preco").value = produto.preco;
  document.getElementById("produto-estoque").value = produto.estoque;

  document.getElementById("titulo-form-produto").textContent = "Alterar Produto";
  document.getElementById("btn-produto").textContent = "Salvar Alterações";
  document.getElementById("cancelar-produto").classList.remove("hidden");
}

function limparFormularioProduto() {
  document.getElementById("form-produto").reset();
  document.getElementById("produto-index").value = "";
  document.getElementById("titulo-form-produto").textContent = "Cadastrar Produto";
  document.getElementById("btn-produto").textContent = "Salvar Produto";
  document.getElementById("cancelar-produto").classList.add("hidden");
}

function renderizarProdutos() {
  const tbody = document.getElementById("lista-produtos");

  if (produtos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = produtos.map((produto, index) => `
    <tr>
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>${produto.estoque}</td>
      <td>
        <button class="btn-edit" onclick="editarProduto(${index})">Alterar</button>
        <button class="btn-danger" onclick="removerProduto(${index})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

function removerProduto(index) {
  produtos.splice(index, 1);
  limparFormularioProduto();
  renderizarProdutos();
  atualizarDashboard();
}

// VENDAS
document.getElementById("form-venda").addEventListener("submit", (event) => {
  event.preventDefault();

  const index = document.getElementById("venda-index").value;
  const venda = {
    cliente: document.getElementById("venda-cliente").value,
    produto: document.getElementById("venda-produto").value,
    quantidade: Number(document.getElementById("venda-quantidade").value),
  };

  if (index === "") {
    vendas.push(venda);
  } else {
    vendas[index] = venda;
  }

  limparFormularioVenda();
  renderizarVendas();
  atualizarDashboard();
});

document.getElementById("cancelar-venda").addEventListener("click", limparFormularioVenda);

function editarVenda(index) {
  const venda = vendas[index];

  document.getElementById("venda-index").value = index;
  document.getElementById("venda-cliente").value = venda.cliente;
  document.getElementById("venda-produto").value = venda.produto;
  document.getElementById("venda-quantidade").value = venda.quantidade;

  document.getElementById("titulo-form-venda").textContent = "Alterar Venda";
  document.getElementById("btn-venda").textContent = "Salvar Alterações";
  document.getElementById("cancelar-venda").classList.remove("hidden");
}

function limparFormularioVenda() {
  document.getElementById("form-venda").reset();
  document.getElementById("venda-index").value = "";
  document.getElementById("titulo-form-venda").textContent = "Registrar Venda";
  document.getElementById("btn-venda").textContent = "Registrar Venda";
  document.getElementById("cancelar-venda").classList.add("hidden");
}

function renderizarVendas() {
  const tbody = document.getElementById("lista-vendas");

  if (vendas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty">Nenhuma venda registrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = vendas.map((venda, index) => `
    <tr>
      <td>${venda.cliente}</td>
      <td>${venda.produto}</td>
      <td>${venda.quantidade}</td>
      <td>
        <button class="btn-edit" onclick="editarVenda(${index})">Alterar</button>
        <button class="btn-danger" onclick="removerVenda(${index})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

function removerVenda(index) {
  vendas.splice(index, 1);
  limparFormularioVenda();
  renderizarVendas();
  atualizarDashboard();
}

function atualizarDashboard() {
  document.getElementById("total-clientes").textContent = clientes.length;
  document.getElementById("total-produtos").textContent = produtos.length;
  document.getElementById("total-vendas").textContent = vendas.length;
}

/*
Conexão futura com Spring Boot:

GET    `${API_BASE_URL}/clientes`
POST   `${API_BASE_URL}/clientes`
PUT    `${API_BASE_URL}/clientes/{id}`
DELETE `${API_BASE_URL}/clientes/{id}`

GET    `${API_BASE_URL}/produtos`
POST   `${API_BASE_URL}/produtos`
PUT    `${API_BASE_URL}/produtos/{id}`
DELETE `${API_BASE_URL}/produtos/{id}`

GET    `${API_BASE_URL}/vendas`
POST   `${API_BASE_URL}/vendas`
PUT    `${API_BASE_URL}/vendas/{id}`
DELETE `${API_BASE_URL}/vendas/{id}`
*/

renderizarClientes();
renderizarProdutos();
renderizarVendas();
atualizarDashboard();