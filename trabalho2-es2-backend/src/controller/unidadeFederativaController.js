const unidadeFederativaServices = require('../services/unidadeFederativaServices');

const listarUnidadesFederativas = async (req, res) => {
    let json = {error:'', result:[]};

    let unidadesFederativas = await unidadeFederativaServices.listarUnidadesFederativas();

    for(let i in unidadesFederativas){
        json.result.push({
            idUnidadeFederativa: unidadesFederativas[i].idUnidadeFederativa,
            unidadeFederativa: unidadesFederativas[i].unidadeFederativa,
            siglaUnidadeFederativa: unidadesFederativas[i].siglaUnidadeFederativa
        });
    }  
    res.json(json);
}

const buscarUnidadeFederativa = async (req, res) => {
    let json = { error: '', result: {} };

    let idUnidadeFederativa = req.params.idUnidadeFederativa;
    let unidadeFederativa = await unidadeFederativaServices.buscarUnidadeFederativa(idUnidadeFederativa);
    
    console.log();

    if (unidadeFederativa) {
        json.result = {
            idUnidadeFederativa: unidadeFederativa.idUnidadeFederativa,
            unidadeFederativa: unidadeFederativa.unidadeFederativa,
            siglaUnidadeFederativa: unidadeFederativa.siglaUnidadeFederativa,
        };
    }
    res.json(json);
}

const buscarIdUnidadeFederativa = async (req, res) => {
    let json = { error: '', result: {} };

    let nomeUnidadeFederativa = req.params.nomeUnidadeFederativa;
    let unidadeFederativa = await unidadeFederativaServices.buscarIdUnidadeFederativa(nomeUnidadeFederativa);
    
    console.log();

    if (unidadeFederativa) {
        json.result = {
            idUnidadeFederativa: unidadeFederativa.idUnidadeFederativa,
            unidadeFederativa: unidadeFederativa.unidadeFederativa,
            siglaUnidadeFederativa: unidadeFederativa.siglaUnidadeFederativa,
        };
    }
    res.json(json);
}

module.exports = {
    listarUnidadesFederativas,
    buscarUnidadeFederativa,
    buscarIdUnidadeFederativa,
};