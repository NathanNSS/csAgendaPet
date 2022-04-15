const conexao = require ('../infraestrutura/database/conexao');
const updateArquivos = require ('../infraestrutura/arquivos/uploadDeArquivos');
//const reposiPets = require ('../repositorios/reposiPets');

class Pet{
    
    adicionar(pet, res) {
        const query = 'INSERT INTO Pets SET ?'

        updateArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if (erro) {
                res.status(400).json({ erro })
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho }

                conexao.query(query, novoPet, erro => {
                    if (erro) {
                        console.log(erro)
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json(novoPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet;