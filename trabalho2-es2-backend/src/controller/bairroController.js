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

const inserirBairro = async(req, res) => {
    let json = {error:'', result:{}};

    let bairro = req.body.bairro;

    if(bairro){
        let existe = await bairroServices.buscarIdBairro(bairro);
        if(!existe) {
            let idBairro = await bairroServices.inserirBairro(bairro);
            json.result = {
                idBairro: idBairro,
                bairro: bairro,
            };
        } else {
            json.result = {
                idBairro: existe.idBairro,
                bairro: bairro,
            };
        }
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

module.exports = {
    buscarBairro,
    inserirBairro,
};