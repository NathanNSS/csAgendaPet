const moment = require("moment");
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao');
const reposiAtendimento  = require('../repositorios/reposiAtendimento');

class Atendimento{
    constructor(){
        this.dataValida = ({data,dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteValido = ({tamanho}) => tamanho >= 5

        this.valida = parametros => this.msgValidacao.filter(campo =>{
            const {nome} = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })
        this.msgValidacao = [
            {
                nome:'data',
                valido: this.dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual :)'
            },
            {
                nome:'cliente',
                valido: this.clienteValido,
                mensagem: 'O nome do Cliente deve ter pelo menos cinco caracteres :)'
            }
        ]
    }

    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros >= 1){
            return new Promise((resolve, reject) => reject(erros))
        }else{
            
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            
            return reposiAtendimento.adiciona(atendimentoDatado)
                .then( resultados => {
                    const id = resultados.insertId
                    return {...atendimento, id}
                })
        }
    }

    listar(){
        return reposiAtendimento.listar();
    }

    buscarPorId(id){

        return reposiAtendimento.buscarPorId(id)
            .then( async resultados => {
                const atendimento = resultados[0]
                const cpf = atendimento.cliente

                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data  

                return atendimento
            })
            
    }

    alterar(valores,id ){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        return reposiAtendimento.alterar(valores, id)
            .then(resultados => {
                return resultados
            });
    }

    deletar(id){

        return reposiAtendimento.deletar(id)
            .then(resultados => {
                return resultados
            })
    }
}
module.exports = new Atendimento;