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

const inserirCidade = (cidade, idUnidadeFederativa) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO cidade (cidade, UnidadeFederativa_idUnidadeFederativa) VALUES (?, ?)', [cidade, idUnidadeFederativa], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const buscarIdCidade = (cidade) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM cidade WHERE cidade = ?', [cidade], (error, results) =>{
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
    inserirCidade,
    buscarIdCidade,
};