const database = require('../database/dbConfig');

const listarProjetos = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarProjeto= (idProjeto) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE projeto.idProjeto = ? AND isAtivo = 1', [idProjeto], (error, results) =>{
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
    listarProjetos,
    buscarProjeto,
};