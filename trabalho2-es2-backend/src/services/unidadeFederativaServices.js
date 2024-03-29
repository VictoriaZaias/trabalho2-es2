const database = require('../database/dbConfig');

const listarUnidadesFederativas = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM unidadeFederativa', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarUnidadeFederativa = (idUnidadeFederativa) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM unidadefederativa WHERE unidadefederativa.idUnidadeFederativa = ?', [idUnidadeFederativa], (error, results) =>{
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
    listarUnidadesFederativas,
    buscarUnidadeFederativa,
};