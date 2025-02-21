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

    constructor(){

    }
}

let requisicao = require('readline-sync')
let n = requisicao.question("Bem vindo ao F-luxo, como podemos ajudar? \n Escolha uma opção no nosso suporte de atendimento:    ")