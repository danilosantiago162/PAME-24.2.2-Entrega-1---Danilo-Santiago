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
    verInformacoesF(){
        console.log("\n--- Suas Informações ---\n");
        console.log(`📌 ID: ${this.ID_unico}`);
        console.log(`📌 Nome de usuario: ${this.nome_usuario}`);
        console.log(`📌 CPF: ${this.cpf}`);
        console.log(`📌 Email: ${this.email}`);
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
    verInformacoesC() {
        console.log("\n--- Suas Informações ---\n");
        console.log(`📌 ID: ${this.ID_unico}`);
        console.log(`📌 Nome: ${this.nome}`);
        console.log(`📌 Data de Nascimento: ${this.data_nascimento}`);
        console.log(`📌 CPF: ${this.cpf}`);
        console.log(`📌 Email: ${this.email}`);
    }
}

class Quartos{

    constructor(qtde_camas, preco_noite, nome, descricao, disponibilidade = "vago"){

        this.qtde_camas = qtde_camas;
        this.preco_noite = preco_noite;
        this.nome = nome;
        this.descricao = descricao;
        this.disponibilidade = disponibilidade;

    }
}

class Avaliacao{

    constructor(nome_ex_cliente, cpf, checkin, checkout, comentario){

        this.nome_ex_cliente = nome_ex_cliente;
        this.cpf = cpf;
        this.checkin = checkin;
        this.checkout = checkout;
        this.comentario = comentario;

    }
}
class Sistema{

    constructor() {

        //armazena em arrays as informações de quarto, cliente, funcionario e reservas

        this.quartos = new Map();
        this.clients = new Map();
        this.funcionarios = new Map();
        this.reservas = new Map();
        this.avaliacoes = new Map();

        //sempre que alguem cadastra/registra um cliente/quarto/funcionario/reserva o this. carrega para as arrays criadas
        

        this.loadClients(); 
        this.loadQuartos();
        this.loadFuncionarios();
        this.loadReservas();
        this.loadAvaliacoes();
        this.loggedInClient = null; // Armazera o cliente logado
        this.loggedInFuncionario = null; // Armazena o funcionario logado
    }
    fazerReserva(){
        console.log("\n--- Reserva de quartos ---\n");

        this.verQuartos(); //exibe todos os quartos com todas informaçôes

        let nome = requisicao.question("\nInsira abaixo o nome do quarto de interesse, assegure-se de que o mesmo encontra-se vago");
        if (this.quartos.has(nome)) { //verifica a existência de algum quarto com o mesmo nome que foi inserido pelo cliente
            let quarto = this.quartos.get(nome); // a variavel quarto é um objeto caso "nome" exista como chave em this.quartos 

            if (quarto.disponibilidade === "vago") {

                let checkin = requisicao.question("\nPor favor, informe-nos o dia de sua chegada: ")
                let checkout = requisicao.question("Por favor, informe-nos o dia de sua saida: ")

                let ID_unico;
                do {
                    ID_unico = this.gerarID();
                } while (this.reservas.has(ID_unico)); 

                let ID_cliente = this.loggedInClient.ID_unico;
                let reserva = new Reserva(ID_unico, ID_cliente, "Realizada", checkin, checkout)
                this.reservas.set(ID_unico, reserva);
                this.saveReservas();

            } else {
                let m = requisicao.question("\nEste quarto nao esta disponivel! \nGostaria de tentar outro? ");
                if (m == "sim"){
                    this.fazerReserva();
                } else {
                    return
                }
            }
        } else {
            let m = requisicao.question("\nDesculpe. Não encontramos esse quarto em nosso sistema.\nGostaria de tentar outro?");
            if (m == "sim"){
                this.fazerReserva();
            }
            else if (m == "nao"){
                return
            } else {
                let m = requisicao.question("\nDesculpe, nao entendi. \nDigite sim ou nao para  a pergunta anterior")
                if (m == "sim"){
                    this.fazerReserva();
                } else {
                    return
                }
            }

        }
    }
    cancelarReserva() {
        // Step 1: Load existing reservations
        if (!fs.existsSync("reservas.json")) {
            console.log("Nenhuma reserva encontrada.");
            return;
        }
        let ID_reserva = requisicao.question("Insira o ID da reserva que voce deseja cancelar: ")
        const data = fs.readFileSync("reservas.json", "utf-8");
        const reservas = JSON.parse(data);
        let reservaExiste = reservas.some(reserva => reserva.ID_unico === ID_reserva);
        if (!reservaExiste) {
            console.log("❌ Reserva não encontrada.");
            return;
        }

        // Step 3: Remove the reservation
        const reservasAtualizadas = reservas.filter(reserva => reserva.ID_unico !== ID_reserva);

        // Step 4: Save updated list back to JSON
        fs.writeFileSync("reservas.json", JSON.stringify(reservasAtualizadas, null, 2));

        console.log(`✅ Reserva ${ID_reserva} cancelada com sucesso!`);
    }
    gerarID() {
        return "ID_" + Math.floor(1000 + Math.random() * 9000);
    }
    MudarDadosC(){
        console.log("\n--- Mudanca de Dados ---\n");
        let change = requisicao.question("Nos diga o que deseja mudar: \n"+
            "Mudar nome:                   Digite 1\n" + 
            "Mudar email:                  Digite 2\n" +
            "Mudar senha:                  Digite 3\n" +
            "Mudar data de nascimento:     Digite 4\n" +
            "Mudar cpf:                    Digite 5\n"
        );

        if (change == 1){
            let novo_nome = requisicao.question("\nPor favor, insira o novo nome desejado: ");
            if (novo_nome.length === 0) {
                console.log("O nome não pode estar vazio. Tente novamente.");
                return;
            }
            this.loggedInClient.nome = novo_nome;
            this.saveClients();
            console.log("\nNome mudado com sucesso!\n")
        }
        if (change == 2){
            let novo_email = requisicao.question("\nPor favor, insira o novo email desejado: ");
            if (novo_email.length === 0) {
                console.log("O email não pode estar vazio. Tente novamente.");
                return;
            }
            this.loggedInClient.email = novo_email;
            this.saveClients();
            console.log("\nEmail mudado com sucesso!\n")
        }
        if (change == 3){
            let nova_senha = requisicao.question("\nPor favor, insira a nova senha desejado: ");
            if (nova_senha.length === 0) {
                console.log("A senha não pode estar vazia. Tente novamente.");
                return;
            }
            this.loggedInClient.senha = nova_senha;
            this.saveClients();
            console.log("\nSenha mudada com sucesso!\n")
        }
        if (change == 4){
            let novo_data_nascimento = requisicao.question("\nPor favor, insira o novo email desejado: ");
            if (novo_data_nascimento.length === 0) {
                console.log("A data de nascimento não pode estar vazia. Tente novamente.");
                return;
            }
            this.loggedInClient.data_nascimento = novo_data_nascimento;
            this.saveClients();
            console.log("\nData de nascimento mudada com sucesso!\n")
        }
        if (change == 5){
            let novo_cpf = requisicao.question("\nPor favor, insira o novo cpf desejado: ");
            if (novo_cpf.length === 0) {
                console.log("O cpf não pode estar vazio. Tente novamente.");
                return;
            }
            this.loggedInClient.cpf = novo_cpf;
            this.saveClients();
            console.log("\nCPF mudado com sucesso!\n")
        }
    }

    verMinhasReservas(){
        console.log("\n--- Lista das Minhas Reservas ---\n");

        let ID_cliente = this.loggedInClient.ID_unico;

        let reservasCliente = Array.from(this.reservas.values()).filter(reserva => reserva.ID_cliente === ID_cliente);

        if (reservasCliente.length === 0) {
            console.log("Nenhuma reserva encontrada para este cliente.");
        } else {
            reservasCliente.forEach(reserva => {
                console.log(
                `ID da reserva: ${reserva.ID_unico}, \n` +
                `ID cliente: ${ID_cliente},\n` +
                `Status: ${reserva.status}, \n` +
                `Check In: ${reserva.checkin}, \n` +
                `Check Out: ${reserva.checkout}\n` +
                `-----------------------\n`);
            });
        }
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
                return;
            }
        } else {
            console.log("\n❌ Email não encontrado. Faça o cadastro primeiro.\n");
            return;
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

        console.log(`\nCadastro realizado com sucesso! Seu ID é: ${ID_unico}\n`);
    }
    verInformacoes() {
        if (this.loggedInClient) {
            this.loggedInClient.verInformacoesC();
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

        console.log(`\nCadastro realizado com sucesso! Seu ID é: ${ID_unico}\n`);
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
                return;
            }
        } else {
            console.log("\n❌ Email não encontrado. Faça o cadastro primeiro.\n");
            return;
        }
    }
//---------------------------------------------------------------------------------------------

//FUNÇÔES DO FUNCIOÁRIO:
    EditarQuarto(){
        this.verQuartos();
        let escolha = requisicao.question("Insira o nome do quarto que voce desejar editar: ");
        let quarto = this.quartos.get(escolha)
        if (quarto){
            let n = requisicao.question("Qual informacao voce deseja alterar?: \n" +
                "Nome:                  Digite 1\n" +
                "Quantidade de camas:   Digite 2\n" +
                "Preco da noite:        Digite 3\n" +
                "Descricao:             Digite 4\n"
            )
            if (n == 1){
                let novo_nome = requisicao.question(`Insira o novo nome do quarto ${quarto.nome}: `);
                quarto.nome = novo_nome;
                this.saveQuartos();
            }
            if (n == 2){
                let novo_qtde_camas= requisicao.question(`Insira a nova quantidade de camas do quarto ${quarto.nome}: `);
                quarto.qtde_camas = novo_qtde_camas;
                this.saveQuartos();
            }
            if (n == 3){
                let novo_preco = requisicao.question(`Insira o novo preco da noite do quarto ${quarto.nome}: `);
                quarto.preco_noite = novo_preco;
                this.saveQuartos();
            }
            if (n == 4){
                let novo_descricao = requisicao.question(`Insira a nova descricao do quarto ${quarto.nome}: `);
                quarto.descricao = novo_descricao;
                this.saveQuartos();
            } 
            if (n != 1 && n != 2 && n != 3 && n != 4) {
                console.log("Desculpe. Opcao inexistente!");
            }
            this.verQuartos();
        }
    }
    ExcluirQuarto(){
        this.verQuartos();

        let escolha = requisicao.question("Insira o nome do quarto que voce deseja excluir: ");

        if (this.quartos.set(escolha)){
            this.quartos.delete(escolha)
            this.saveQuartos();

            console.log("\nQuarto deletado com sucesso!");

            this.verQuartos();
            return
        } else { 
            console.log("\nDesculpe. Quarto inexistente!\n");
        }
    }
    MudarDadosF(){
        console.log("\n--- Mudanca de Dados ---\n");
        let change = requisicao.question("Nos diga o que deseja mudar: \n"+
            "Mudar nome de usuario:        Digite 1\n" +
            "Mudar email:                  Digite 2\n" +
            "Mudar senha:                  Digite 3\n" 
        );

        if (change == 1){
            let novo_nome = requisicao.question("\nPor favor, insira o novo nome desejado: ");
            if (novo_nome.length === 0) {
                console.log("O nome não pode estar vazio. Tente novamente.");
                return;
            }
            this.loggedInFuncionario.nome_usuario = novo_nome;
            this.saveFuncionarios();
            console.log("\nNome mudado com sucesso!\n")
        }
        if (change == 2){
            let novo_email = requisicao.question("\nPor favor, insira o novo email desejado: ");
            if (novo_email.length === 0) {
                console.log("O email não pode estar vazio. Tente novamente.");
                return;
            }
            this.loggedInFuncionario.email = novo_email;
            this.saveFuncionarios();
            console.log("\nEmail mudado com sucesso!\n")
        }
        if (change == 3){
            let nova_senha = requisicao.question("\nPor favor, insira a nova senha desejado: ");
            if (nova_senha.length === 0) {
                console.log("A senha não pode estar vazia. Tente novamente.");
                return;
            }
            this.loggedInFuncionario.senha = nova_senha;
            this.saveFuncionarios();
            console.log("\nSenha mudada com sucesso!\n")
        }
    }

    verInformacoesf(){
        if (this.loggedInFuncionario) {
            this.loggedInFuncionario.verInformacoesF();
        }
    }
    listarReservas() {
        console.log("\n--- Lista de Reservas ---\n");
        if (this.reservas.size === 0) {
            console.log("Nenhuma reserva cadastrada.");
        } else {
            this.reservas.forEach((reserva, ID_unico) => {
                console.log(
                    `ID da Reserva: ${ID_unico}` +
                    `ID do Cliente: ${reserva.ID_cliente}` +
                    `Status: ${reserva.status}` +
                    `Check In: ${reserva.checkin}` +
                    `Check Out: ${reserva.checkout}\n`
                );
            });
        }
    }
    addQuartos() {
        console.log("\n--- Registramento de Quartos ---\n");

        let qtde_camas = requisicao.question("Quantidade de camas: ");
        let preco_noite = requisicao.question("Preco por noite: ");
        let nome = requisicao.question("Nome do quarto: ");
        let descricao = requisicao.question("Descricao do quarto: ");
        let disponibilidade = "vago"

        let quarto = new Quartos(qtde_camas, preco_noite, nome, descricao, disponibilidade);
        this.quartos.set(nome, quarto);
        this.saveQuartos();

        console.log("Cadastramento de quarto realizado com sucesso!\n");
    }
    verQuartos() {
        console.log("\n--- Lista de Quartos ---\n");
        if (this.quartos.size === 0) {
            console.log("Não há quartos");
        } else {
            this.quartos.forEach((quarto, nome) => {
                console.log(
                    `quantidade de camas: ${quarto.qtde_camas}, \n` +
                    `preço por noite: ${quarto.preco_noite},\n` +
                    `nome: ${nome}, \n` +
                    `comentários: ${quarto.descricao}, \n` +
                    `Disponibilidade: ${quarto.disponibilidade}\n` +
                    `-------------------------\n`);
            });
        }
    }
    listarClientes() {
        console.log("\n--- Lista de Clientes ---\n");
        if (this.clients.size === 0) {
            console.log("Nenhum cliente cadastrado.");
        } else {
            this.clients.forEach((cliente, id) => {
                console.log(`ID: ${id}, Nome: ${cliente.nome}, Email: ${cliente.email}\n`);
            });
        }
    }
    MudarStatus(){
        let ID_reserva = requisicao.question("\nPor favor, insira o ID da reserva que voce deseja alterar o status: ")
        let reserva = this.reservas.get(ID_reserva) 
        if (!reserva){
            console.log("Desculpe. Reserva não encontrada!");
            return;
        }
        let novo_status = requisicao.question(`\nAltere o status da reserva: ${reserva.ID_unico} de ${reserva.status} para: `)
        reserva.status = novo_status

        console.log(`\n✅ Status atualizado com sucesso para "${reserva.status}"!\n`);

        this.saveReservas();
    }

//-----------------------------------------------------------------------------------------------------
//SAVE AND LOADS

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
    saveAvaliacoes() {
        const avaliacoesArray = Array.from(this.avaliacoes.values());
        fs.writeFileSync("avaliacoes.json", JSON.stringify(avaliacoesArray, null, 2))
    }
    loadAvaliacoes() {
        if (fs.existsSync("avaliacoes.json")) {
            const data = fs.readFileSync("avaliacoes.json", "utf-8");
            const avaliacoesArray = JSON.parse(data);
            avaliacoesArray.forEach(avaliacaoObj => {
                let avaliacao = new Avaliacao(
                    avaliacaoObj.nome_ex_cliente,
                    avaliacaoObj.cpf,
                    avaliacaoObj.checkin,
                    avaliacaoObj.checkout,
                    avaliacaoObj.comentario
                );
                this.avaliacoes.set(avaliacao.cpf, avaliacao);
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
    saveReservas() {
        const reservasArray = Array.from(this.reservas.values());
        fs.writeFileSync("reservas.json", JSON.stringify(reservasArray, null, 2));
    }
    
    loadReservas() {
        if (fs.existsSync("reservas.json")) {
            const data = fs.readFileSync("reservas.json", "utf-8");
            const reservasArray = JSON.parse(data);
            reservasArray.forEach(reservaObj => {
                // Convert plain object to Cliente instance
                let reserva = new Reserva(
                    reservaObj.ID_unico,
                    reservaObj.ID_cliente,
                    reservaObj.status,
                    reservaObj.checkin,
                    reservaObj.checkout,
                );
                this.reservas.set(reserva.ID_unico, reserva);
            });
        }
    }    
//-------------------------------------------------------------------------------------------------------------
FazerAvaliacao(){
    console.log("\n---   Avaliacao de estadia   ---\n");

    let nome_ex_cliente = requisicao.question("Qual seu nome?: ");
    let cpf = requisicao.question('Insira o numero do seu cpf por favor, sem os caracteres "." e "-" .');
    let checkin = requisicao.question("Qual foi o dia do seu checkin?: ");
    let checkout = requisicao.question("Qual foi o dia do seu checkout?: ");
    let comentario = requisicao.question("Diga-nos como foi a sua experiencia no Hotel F-luxo: ")

    let avaliacao = new Avaliacao(nome_ex_cliente, cpf, checkin, checkout, comentario);
    this.avaliacoes.set(cpf, avaliacao);
    this.saveAvaliacoes();
}
VisualizarAvaliacoes(){
    console.log("\n---   Lista de Avaliacoes   ---\n");
    if (this.avaliacoes.size === 0) {
        console.log("Desculpe. Não há avaliacoes no momento!");
        return;
    }
    this.avaliacoes.forEach((avaliacao, cpf) => {
        console.log(
            `\nNome do hospede: ${avaliacao.nome_ex_cliente}` +
            `\nData de checkin: ${avaliacao.checkin}` +
            `\nData de checkout: ${avaliacao.checkout}` +
            `\nAvaliacao do hospede: \n\n${avaliacao.comentario}` 
        );
    });
}
}
let sistema = new Sistema()
let n1 = requisicao.question("\nBem vindo ao F-luxo, como podemos ajudar?\n\n" + 
    "Escolha uma opcao no nosso suporte de atendimento:\n\n" +
    "Fazer Login de Cliente =                Digite 1 \n" +
    "Fazer Login de Funcionario =            Digite 2 \n" +
    "Fazer Cadastro de Cliente =             Digite 3 \n" +
    "Fazer Cadastro de Funcionario =         Digite 4 \n" +
    "Sair do Programa =                      Digite 5\n" +
    "Avaliar estadia =                       Digite 6\n" +
    "Visualizar avaliacoes =                 Digite 7\n" 
    )
if (n1 == 1){
    sistema.fazerLoginC();
    let n2 = requisicao.question("Como podemos ajudar? \n" +
        "Ver meus dados:            Digite 1\n" +
        "Ver lista de quartos:      Digite 2\n" +
        "Fazer Reserva:             Digite 3\n" + 
        "Cancelar Reserva:          Digite 4\n" +
        "Ver minhas reservas:       Digite 5\n" +
        "Mudar meus dados:          Digite 6\n"
        )
    if (n2 == 1){
        sistema.verInformacoes();
    }
    if (n2 == 2){
        sistema.verQuartos();
    }
    if (n2 == 3){
        sistema.fazerReserva();
    }
    if (n2 == 4){
        sistema.cancelarReserva();
    }
    if (n2 == 5){
        sistema.verMinhasReservas();
    }
    if (n2 == 6){
        sistema.MudarDadosC();
    }
}
if (n1 == 2){
    if (sistema.fazerLoginF() == true){
        let n2 = requisicao.question("Bem vindo novamente, o que deseja fazer?: \n"+
            "Acessar lista de clientes:     Digite 1\n" +
            "Registrar novos quartos:       Digite 2\n" +
            "Acessar lista de quartos:      Digite 3\n" +
            "Ver suas informacoes:          Digite 4\n" +
            "Listar reservas:               Digite 5\n" +
            "Mudar status de reserva:       Digite 6\n" +
            "Mudar seus dados:              Digite 7\n" +
            "Editar quartos:                Digite 8\n" +
            "Excluir quartos:               Digite 9\n" 
        )
        if (n2 == 1){
            sistema.listarClientes();
        }
        if (n2 == 2){
            sistema.addQuartos();
        }
        if (n2 == 3){
            sistema.verQuartos();
        }
        if (n2 == 4){
            sistema.verInformacoesf();
        }
        if (n2 == 5){
            sistema.listarReservas();
        }
        if (n2 == 6){
            sistema.MudarStatus();
        }
        if (n2 == 7){
            sistema.MudarDadosF();
        }
        if (n2 == 8){
            sistema.EditarQuarto();
        }
        if (n2 == 9){
            sistema.ExcluirQuarto();
        }
    }
}
if (n1 == 3){
    sistema.fazerCadastroC();
}
if (n1 == 4){
    sistema.fazerCadastroF();
}
if (n1 == 6){
    sistema.FazerAvaliacao();
}
if (n1 == 7){
    sistema.VisualizarAvaliacoes();
}