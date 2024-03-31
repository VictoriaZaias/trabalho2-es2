const database = require('../database/dbConfig');

const listarProfissionais = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional', (error, results) =>{
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

const buscarProfissionaisPorTime = (idTime) => {
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

const inserirProfissional = (nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idTime, idEspecialidade) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO profissional (nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, isAtivo, Endereco_idEndereco, Time_idTime, Especialidade_idEspecialidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, 1, idEndereco, idTime, idEspecialidade], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const alterarProfissional = (idProfissional, nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idTime, idEspecialidade) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE profissional SET nomeCompleto = ?, nomeSocial = ?, cpf = ?, dataNascimento = ?, raca = ?, genero = ?, nroEndereco = ?, complementoEndereco = ?, Endereco_idEndereco = ?, Time_idTime = ?, Especialidade_idEspecialidade = ?  WHERE idProfissional = ?', [nomeCompleto, nomeSocial, cpf, dataNascimento, raca, genero, nroEndereco, complementoEndereco, idEndereco, idTime, idEspecialidade, idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirProfissional = (idProfissional) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE profissional SET isAtivo = 0 WHERE idProfissional = ?', [idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const removerTimeProfissional = (idProfissional) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE profissional SET Time_idTime = null  WHERE idProfissional = ?', [idProfissional], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}


module.exports = {
    listarProfissionais,
    buscarProfissional,
    buscarProfissionaisPorTime,
    inserirProfissional,
    alterarProfissional,
    excluirProfissional,
    removerTimeProfissional,
};