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

    construtor(ID_unico, nome_usuario, cpf, email, senha){

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
        this.clients = new Map(); // Store clients using their unique ID
        this.loadData(); // Load existing clients from file when the system starts
    }
    gerarID() {
        return "ID_" + Math.floor(1000 + Math.random() * 9000);
    }

    fazerCadastro() {
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
        this.saveData(); // Save data after adding a new client

        console.log(`\nCadastro realizado com sucesso! Seu ID é: ${ID_unico}`);
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
    saveData() {
        const clientsArray = Array.from(this.clients.values());
        fs.writeFileSync("clientes.json", JSON.stringify(clientsArray, null, 2));
    }

    loadData() {
        if (fs.existsSync("clientes.json")) {
            const data = fs.readFileSync("clientes.json", "utf-8");
            const clientsArray = JSON.parse(data);
            clientsArray.forEach(cliente => {
                this.clients.set(cliente.ID_unico, cliente);
            });
        }
    }
}
let sistema = new Sistema()
let n1 = requisicao.question("\nBem vindo ao F-luxo, como podemos ajudar?\n\n" + 
    "Escolha uma opcao no nosso suporte de atendimento:\n\n" +
    "Fazer Login = Aperte 1 \n" +
    "Fazer Cadastro = Aperte 2 \n" +
    "Sair do Programa = Aperte 3\n" +
    "Avaliar estadia = Aperte 4\n" +
    "Visualizar avaliacoes = Aperte 5\n" 
    )

if (n1 == 2){
    sistema.fazerCadastro(); // Call the method correctly
}
if (n1 == 10){
    sistema.listarClientes();
}