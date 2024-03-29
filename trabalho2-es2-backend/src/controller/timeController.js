const timeServices = require('../services/timeServices');

const listarTimes = async (req, res) => {
    let json = {error:'', result:[]};

    let times = await timeServices.listarTimes();

    for(let i in times){
        json.result.push({
            idTime: times[i].idTime,
            nomeTime: times[i].nomeTime,
        });
    }  
    res.json(json);
}

const buscarTime = async (req, res) => {
    let json = { error: '', result: {} };

    let idTime = req.params.id;
    let time = await timeServices.buscarTime(idTime);
    
    console.log(time);

    if (time) {
        json.result = {
            idTime: time.idTime,
            nomeTime: time.nomeTime,
        };
    }
    res.json(json);
}

module.exports = {
    listarTimes,
    buscarTime,
};