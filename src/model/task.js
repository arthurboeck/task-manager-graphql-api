export default class Task {
    constructor(nome, descricao, responsavel, status, dataCriacao, dataConclusao) {
        this.nome = nome;
        this.descricao = descricao;
        this.responsavel = responsavel;
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.dataConclusao = dataConclusao;
    }
};