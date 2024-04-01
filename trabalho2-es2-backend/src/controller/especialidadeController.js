const especialidadeServices = require('../services/especialidadeServices');

const listarEspecialidades = async (req, res) => {
    let json = {error:'', result:[]};

    let especialidades = await especialidadeServices.listarEspecialidades();

    for(let i in especialidades){
        json.result.push({
            idEspecialidade: especialidades[i].idEspecialidade,
            tipoEspecialidade: especialidades[i].tipoEspecialidade,
            siglaEspecialidade: especialidades[i].siglaEspecialidade,
        });
    }
    res.json(json);
}

module.exports = {
    listarEspecialidades,
};