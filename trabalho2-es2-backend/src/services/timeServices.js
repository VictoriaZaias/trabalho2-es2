const database = require('../database/dbConfig');

const listarTimes = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM time WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarTime= (idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM time WHERE time.idTime = ? AND isAtivo = 1', [idTime], (error, results) =>{
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
    listarTimes,
    buscarTime,
};