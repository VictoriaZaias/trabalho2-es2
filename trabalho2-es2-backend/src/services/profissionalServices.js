const database = require('../database/dbConfig');

const listarProfissionais = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarProfissional = (idProfissional) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional WHERE profissional.idProfissional = ? AND isAtivo = 1', [idProfissional], (error, results) =>{
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
    listarProfissionais,
    buscarProfissional,
};