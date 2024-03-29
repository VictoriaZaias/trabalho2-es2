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

const buscarProfissional = async (req, res) => {
    let json = { error: '', result: {} };

    let idProfissional = req.params.id;
    let profissional = await profissionalServices.buscarProfissional(idProfissional);
    let time = await timeServices.buscarTime(profissional.Time_idTime);
    let especialidade = await especialidadeServices.buscarEspecialidade(profissional.Especialidade_idEspecialidade);

    console.log(profissional);

    if (profissional) {
        json.result = {
            idProfissional: profissional.idProfissional,
            nomeCompleto: profissional.nomeCompleto,
            nomeSocial: profissional.nomeSocial,
            cpf: profissional.cpf,
            dataNascimento: profissional.dataNascimento,
            raca: profissional.raca,
            genero: profissional.genero,
            nroEndereco: profissional.nroEndereco,
            complementoEndereco: profissional.complementoEndereco,
            idEndereco: profissional.Endereco_idEndereco,
            idTime: time.idTime,
            time: time.nomeTime,
            especialidade: especialidade.tipoEspecialidade,
            siglaEspecialidade: especialidade.siglaEspecialidade,
        };
    }
    res.json(json);
}

module.exports = {
    listarProfissionais,
    buscarProfissional,
};