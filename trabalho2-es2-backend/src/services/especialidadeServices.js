const database = require('../database/dbConfig');

const listarEspecialidades = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM especialidade', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarEspecialidade = (idEspecialidade) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM especialidade WHERE especialidade.idEspecialidade = ?', [idEspecialidade], (error, results) =>{
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
    listarEspecialidades,
    buscarEspecialidade,
};