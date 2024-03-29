const database = require('../database/dbConfig');

const buscarLogradouro = (idLogradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM logradouro WHERE logradouro.idLogradouro = ?', [idLogradouro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

module.exports = {
    buscarLogradouro,
};