const Atendimento = require('../models/modelsAtendimentos.js');
 module.exports = app => {

    app.get('/atendimento', (req, res) => {

        Atendimento.listar()
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
        
    });
    
    app.get('/atendimento/:id', (req, res) => {

        const id = parseInt(req.params.id);
    
        Atendimento.buscarPorId(id, res)
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
        
    });
    
    app.post('/atendimento', (req, res) => {
        //console.log(req.body)
        
        const atendimento = req.body;

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(400).json(erros));

    });

    app.patch('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.alterar(valores, id)
            .then(itensEditados => res.status(201).json(itensEditados))
            .catch(erros => res.status(400).json(erros))
    
    })

    app.delete('/atendimento/:id', (req, res) =>{
        const id = parseInt(req.params.id);

        Atendimento.deletar(id)
            .then(itemDeletado => res.status(200).json(itemDeletado))
            .catch(erros => res.status(400).json(erros))
    })

    // app.get('/teste', (req, res) =>{
    //     const rec = req.query.dado;

    //     const valorDig = `Voce digitou isto ${rec}`;

    //     res.send(valorDig);
    // })
    
 }

