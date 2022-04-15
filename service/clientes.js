const express = require('express')

const app = new express()
const faker = require('faker')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/:cpf', async (req, res) => {
    const { cpf } = req.params
    console.log(cpf)
    res.status(200).json( {
        cpf,
        nome: faker.name.findName(),
        dataDeNascimento: faker.date.past()
    })

})

app.listen(8082, () => console.log('Api Service Rodando'))
