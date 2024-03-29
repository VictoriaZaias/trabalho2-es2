const profissionalServices = require('../services/profissionalServices');


const listarProfissionais = async (req, res) => {
    let json = {error:'', result:[]};

    let profissionais = await profissionalServices.listarProfissional();

    for(let i in profissionais){
        let time = await timeServices.buscarTime(profissionais[i].Time_idTime);
        let especialidade = await especialidadeServices.buscarEspecialidade(profissionais[i].Especialidade_idEspecialidade);
        json.result.push({
            idProfissional: profissionais[i].idProfissional,
            nomeCompleto: profissionais[i].nomeCompleto,
            nomeSocial: profissionais[i].nomeSocial,
            cpf: profissionais[i].cpf,
            dataNascimento: profissionais[i].dataNascimento,
            raca: profissionais[i].raca,
            genero: profissionais[i].genero,
            nroEndereco: profissionais[i].nroEndereco,
            complementoEndereco: profissionais[i].complementoEndereco,
            cep: profissionais[i].cep,
            idTime: time.idTime,
            time: time.nomeTime,
            especialidade: especialidade.tipoEspecialidade,
            siglaEspecialidade: especialidade.siglaEspecialidade,
        });
    }  
    res.json(json);
}

module.exports = {
    listarProfissionais,
};