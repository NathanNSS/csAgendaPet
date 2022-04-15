 const Pet = require('../models/modelsPets');
 module.exports = app => {

     app.post('/pet',(req, res) => {
         
        const pet = req.body;
        Pet.adicionar(pet, res)
            
     })
 }