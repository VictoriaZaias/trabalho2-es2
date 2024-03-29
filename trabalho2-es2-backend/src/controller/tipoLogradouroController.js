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

const inserirTipoLogradouro = async(req, res) => {
    let json = {error:'', result:{}};

    let tipoLogradouro = req.body.nomeTipoLogradouro;

    if(tipoLogradouro){
        let existe = await tipoLogradouroServices.buscarIdTipoLogradouro(tipoLogradouro);
        if(!existe) {
            let idTipoLogradouro = await tipoLogradouroServices.inserirTipoLogradouro(tipoLogradouro);
            json.result = {
                idTipoLogradouro: idTipoLogradouro,
                tipoLogradouro: tipoLogradouro,
            };
        } else {
            json.result = {
                idTipoLogradouro: existe.idTipoLogradouro,
                tipoLogradouro: tipoLogradouro,
            };
        }
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

module.exports = {
    buscarTipoLogradouro,
    inserirTipoLogradouro,
};