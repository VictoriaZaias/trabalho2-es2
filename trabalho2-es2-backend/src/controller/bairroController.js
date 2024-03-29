const bairroServices = require('../services/bairroServices');

const buscarBairro = async (req, res) => {
    let json = { error: '', result: {} };

    let idBairro = req.params.idBairro;
    let bairro = await bairroServices.buscarBairro(idBairro);
    
    console.log();

    if (bairro) {
        json.result = {
            idBairro: bairro.idBairro,
            bairro: bairro.Bairro,
        };
    }
    res.json(json);
}

module.exports = {
    buscarBairro,
};