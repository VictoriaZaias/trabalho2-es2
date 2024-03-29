const tipoLogradouroServices = require('../services/tipoLogradouroServices');

const buscarTipoLogradouro = async (req, res) => {
    let json = { error: '', result: {} };

    let idTipoLogradouro = req.params.idTipoLogradouro;
    let tipoLogradouro = await tipoLogradouroServices.buscarTipoLogradouro(idTipoLogradouro);
    
    console.log();

    if (tipoLogradouro) {
        json.result = {
            idTipoLogradouro: tipoLogradouro.idTipoLogradouro,
            tipoLogradouro: tipoLogradouro.tipoLogradouro,
        };
    }
    res.json(json);
}

module.exports = {
    buscarTipoLogradouro,
};