const database = require('../database/dbConfig');

const buscarCidade = (idCidade) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM cidade WHERE cidade.idCidade = ?', [idCidade], (error, results) =>{
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
    buscarCidade,
};