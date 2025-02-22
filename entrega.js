//Teste

//console.log("Hello World")

//var requisicao = require('readline-sync')

//var nome = requisicao.question("Qual seu nome?:")

//console.log(nome)

//class person{
    //constructor(nome, idade, altura){

        //this.nome = nome;
        //this.idade = idade;
        //this.altura = altura;
    //}
//}

//var requisicao = require('readline-sync')
//let name = requisicao.question("Insira seu nome: ")
//let person1 = new person(name, 21, 1.88)
//console.log(person1)
const fs = require("fs"); //Import file system module
let requisicao = require('readline-sync')

class Reserva{

    constructor(ID_unico, ID_cliente, status, checkin, checkout){

        this.ID_unico = ID_unico;
        this.ID_cliente = ID_cliente;
        this.status = status;
        this.checkin = checkin;
        this.checkout = checkout;

    }
}

class Funcionario{

    constructor(ID_unico, nome_usuario, cpf, email, senha){

        this.ID_unico = ID_unico;
        this.nome_usuario = nome_usuario;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;

    }
    
}

class Cliente{

    constructor(ID_unico, nome, data_nascimento, cpf, email, senha){
        
        this.ID_unico = ID_unico;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;

    }
    verInformacoes() {
        console.log("\n--- Suas Informações ---\n");
        console.log(`📌 ID: ${this.ID_unico}`);
        console.log(`📌 Nome: ${this.nome}`);
        console.log(`📌 Data de Nascimento: ${this.data_nascimento}`);
        console.log(`📌 CPF: ${this.cpf}`);
        console.log(`📌 Email: ${this.email}`);
    }
}

class Quartos{

    constructor(qtde_camas, preco_noite, nome, descricao){

        this.qtde_camas = qtde_camas;
        this.preco_noite = preco_noite;
        this.nome = nome;
        this.descricao = descricao;

    }
}

class Sistema{

    constructor() {
        this.quartos = new Map(); // armazena os quartos
        this.clients = new Map(); // Store clients using their unique ID
        this.funcionarios = new Map();
        this.loadClients(); // Load existing clients from file when the system starts
        this.loadQuartos();
        this.loadFuncionarios();
        this.loggedInClient = null; // Store the logged-in client
        this.loggedInFuncionario = null;
    }
    gerarID() {
        return "ID_" + Math.floor(1000 + Math.random() * 9000);
    }
    fazerLoginC() {
        console.log("\n--- Login de Cliente ---\n");

        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", { hideEchoBack: true });

        // Search for client by email
        let clienteEncontrado = null;
        this.clients.forEach(cliente => {
            if (cliente.email === email) {
                clienteEncontrado = cliente;
            }
        });

        // Check login details
        if (clienteEncontrado) {
            if (clienteEncontrado.senha === senha) {
                console.log(`\n✅ Login bem-sucedido! Bem-vindo, ${clienteEncontrado.nome}.\n`);
                this.loggedInClient = clienteEncontrado;
                return true;
            } else {
                console.log("\n❌ Senha incorreta. Tente novamente.\n");
            }
        } else {
            console.log("\n❌ Email não encontrado. Faça o cadastro primeiro.\n");
        }
    }  
    fazerCadastroC() {
        console.log("\n--- Cadastro de Cliente ---\n");

        let nome = requisicao.question("Insira seu nome: ");
        let data_nascimento = requisicao.question("Insira sua data de nascimento (DD/MM/AAAA): ");
        let cpf = requisicao.question("Insira seu CPF: ");
        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", { hideEchoBack: true });

        let ID_unico;
        do {
            ID_unico = this.gerarID();
        } while (this.clients.has(ID_unico)); // Ensure unique ID

        let cliente = new Cliente(ID_unico, nome, data_nascimento, cpf, email, senha);
        this.clients.set(ID_unico, cliente);
        this.saveClients(); // Save data after adding a new client

        console.log(`\nCadastro realizado com sucesso! Seu ID é: ${ID_unico}`);
    }
    verInformacoes() {
        if (this.loggedInClient) {
            this.loggedInClient.verInformacoes();
        } else {
            console.log("\n⚠️ Nenhum usuário logado. Faça login primeiro.\n");
        }
    }
    fazerCadastroF() {
        console.log("\n--- Cadastro de Funcionario ---\n");

        let nome_usuario = requisicao.question("Insira seu nome de usuario: ");
        let cpf = requisicao.question("Insira seu CPF: ");
        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", { hideEchoBack: true });

        let ID_unico;
        do {
            ID_unico = this.gerarID();
        } while (this.funcionarios.has(ID_unico)); // Ensure unique ID

        let funcionario = new Funcionario(ID_unico, nome_usuario, cpf, email, senha);
        this.funcionarios.set(ID_unico, funcionario);
        this.saveFuncionarios(); // Save data after adding a new funcionario

        console.log(`\nCadastro realizado com sucesso! Seu ID é: ${ID_unico}`);
    }
    fazerLoginF() {
        console.log("\n--- Login de Funcionario ---\n");

        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", { hideEchoBack: true });

        // Search for client by email
        let FuncionarioEncontrado = null;
        this.funcionarios.forEach(funcionario => {
            if (funcionario.email === email) {
                FuncionarioEncontrado = funcionario;
            }
        });

        // Check login details
        if (FuncionarioEncontrado) {
            if (FuncionarioEncontrado.senha === senha) {
                console.log(`\n✅ Login bem-sucedido! Bem-vindo, ${FuncionarioEncontrado.nome_usuario}.\n`);
                this.loggedInFuncionario = FuncionarioEncontrado;
                return true;
            } else {
                console.log("\n❌ Senha incorreta. Tente novamente.\n");
            }
        } else {
            console.log("\n❌ Email não encontrado. Faça o cadastro primeiro.\n");
        }
    }
    addQuartos() {
        console.log("\n--- Registramento de Quartos ---\n");

        let qtde_camas = requisicao.question("Quantidade de camas: ");
        let preco_noite = requisicao.question("Preco por noite: ");
        let nome = requisicao.question("Nome do quarto: ");
        let descricao = requisicao.question("Descricao do quarto: ");

        let quarto = new Quartos(qtde_camas, preco_noite, nome, descricao);
        this.quartos.set(nome, quarto);
        this.saveQuartos();
    }
    verQuartos() {
        console.log("\n--- Lista de Quartos ---\n");
        if (this.quartos.size === 0) {
            console.log("Não há quartos");
        } else {
            this.quartos.forEach((quarto, nome) => {
                console.log(`quantidade de camas: ${quarto.qtde_camas}, \npreço por noite: ${quarto.preco_noite},\nnome: ${nome}, \ncomentários: ${quarto.descricao}`);
            });
        }
    }
    listarClientes() {
        console.log("\n--- Lista de Clientes ---\n");
        if (this.clients.size === 0) {
            console.log("Nenhum cliente cadastrado.");
        } else {
            this.clients.forEach((cliente, id) => {
                console.log(`ID: ${id}, Nome: ${cliente.nome}, Email: ${cliente.email}`);
            });
        }
    }
    saveClients() {
        const clientsArray = Array.from(this.clients.values());
        fs.writeFileSync("clientes.json", JSON.stringify(clientsArray, null, 2));
    }

    loadClients() {
        if (fs.existsSync("clientes.json")) {
            const data = fs.readFileSync("clientes.json", "utf-8");
            const clientsArray = JSON.parse(data);
            clientsArray.forEach(clienteObj => {
                // Convert plain object to Cliente instance
                let cliente = new Cliente(
                    clienteObj.ID_unico,
                    clienteObj.nome,
                    clienteObj.data_nascimento,
                    clienteObj.cpf,
                    clienteObj.email,
                    clienteObj.senha
                );
                this.clients.set(cliente.ID_unico, cliente);
            });
        }
    }
    saveFuncionarios() {
        const funcionariosArray = Array.from(this.funcionarios.values());
        fs.writeFileSync("funcionarios.json", JSON.stringify(funcionariosArray, null, 2));
    }

    loadFuncionarios() {
        if (fs.existsSync("funcionarios.json")) {
            const data = fs.readFileSync("funcionarios.json", "utf-8");
            const funcioariosArray = JSON.parse(data);
            funcioariosArray.forEach(funcionarioObj => {
                // Convert plain object to Cliente instance
                let funcionario = new Funcionario(
                    funcionarioObj.ID_unico,
                    funcionarioObj.nome_usuario,
                    funcionarioObj.cpf,
                    funcionarioObj.email,
                    funcionarioObj.senha
                );
                this.funcionarios.set(funcionario.ID_unico, funcionario);
            });
        }
    }
    saveQuartos() {
        const quartosArray = Array.from(this.quartos.values());
        fs.writeFileSync("quartos.json", JSON.stringify(quartosArray, null, 2));
    }

    loadQuartos() {
        if (fs.existsSync("quartos.json")) {
            const data = fs.readFileSync("quartos.json", "utf-8");
            const quartosArray = JSON.parse(data);
            quartosArray.forEach(quartoObj => {
                // Convert plain object to Cliente instance
                let quarto = new Quartos(
                    quartoObj.qtde_camas,
                    quartoObj.preco_noite,
                    quartoObj.nome,
                    quartoObj.descricao
                );
                this.quartos.set(quarto.nome, quarto);
            });
        }
    }
}
let sistema = new Sistema()
let n1 = requisicao.question("\nBem vindo ao F-luxo, como podemos ajudar?\n\n" + 
    "Escolha uma opcao no nosso suporte de atendimento:\n\n" +
    "Fazer Login de Cliente = Aperte 1 \n" +
    "Fazer Login de Funcionario = Aperte 2 \n" +
    "Fazer Cadastro de Cliente = Aperte 3 \n" +
    "Fazer Cadastro de Funcionario = Aperte 4 \n" +
    "Sair do Programa = Aperte 5\n" +
    "Avaliar estadia = Aperte 6\n" +
    "Visualizar avaliacoes = Aperte 7\n" 
    )
if (n1 == 1){
    sistema.fazerLoginC();
    let n2 = requisicao.question("Como podemos ajudar? \n" +
        "Ver meus dados: aperte 1\n" +
        "Ver lista de quartos: aperte 2\n" +
        "Fazer Reserva: aperte 3\n" + 
        "Cancelar Reserva: aperte 4\n" +
        "Ver minhas reservas: aperte 5\n"
        )
    if (n2 == 1){
        sistema.verInformacoes();
    }
    if (n2 == 2){
        sistema.verQuartos();
    }
    if (n2 == 3){

    }
    if (n2 == 4){

    }
    if (n2 == 5){

    }
}
if (n1 == 2){
    sistema.fazerLoginF();

    if (n1 == 1){
        sistema.listarClientes();
    }
    if (n1 == 2){
        sistema.addQuartos();
    }
}
if (n1 == 3){
    sistema.fazerCadastroC(); // Call the method correctly
}
if (n1 == 4){
    sistema.fazerCadastroF();
}
if (n1 == 10){
    sistema.listarClientes();
}
if (n1 == 11){
    sistema.addQuartos();
}