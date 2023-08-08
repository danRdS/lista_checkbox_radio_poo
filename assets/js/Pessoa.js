export class Pessoa {
    static id = 1;
    constructor(nome, idade){
        this.id = Pessoa.id++;
        this.nome = nome;
        this.idade = idade;
    }
}