const database = require('../database/dbConfig');

const listarProfissionais = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const listarProfissionaisPorTime = (idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional WHERE profissional.Time_idTime = ?', [idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results);
            }else{
                aceito(false);
            }
        });
    });
}

const buscarProfissional = (idProfissional) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional WHERE profissional.idProfissional = ?', [idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirProfissional = (nomeCompleto, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idEspecialidade, idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO profissional (nomeCompleto, dataNascimento, raca, genero, nroEndereco, complementoEndereco, Endereco_idEndereco, Time_idTime, Especialidade_idEspecialidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nomeCompleto, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idTime, idEspecialidade], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const alterarProfissional = (idProfissional, nomeCompleto, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idEspecialidade) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE profissional SET nomeCompleto = ?, dataNascimento = ?, raca = ?, genero = ?, nroEndereco = ?, complementoEndereco = ?, Endereco_idEndereco = ?, Especialidade_idEspecialidade = ?  WHERE idProfissional = ?', [nomeCompleto, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idEspecialidade, idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const adicionarTimeProfissional = (idProfissional, idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE profissional SET Time_idTime = ?  WHERE idProfissional = ?', [idTime, idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirTimeProfissional = (idProfissional) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE profissional SET Time_idTime = NULL  WHERE idProfissional = ?', [idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirProfissional = (idProfissional) => {
    return new Promise((aceito, rejeitado) => {
        database.query('DELETE FROM profissional WHERE idProfissional = ?', [idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarProfissionais,
    listarProfissionaisPorTime,
    buscarProfissional,
    inserirProfissional,
    alterarProfissional,
    adicionarTimeProfissional,
    excluirTimeProfissional,
    excluirProfissional,
};