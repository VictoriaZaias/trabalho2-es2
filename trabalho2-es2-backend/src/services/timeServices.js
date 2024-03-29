const database = require('../database/dbConfig');

const listarTimes = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM time WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarTimes,
};