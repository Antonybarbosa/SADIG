const moment = require('moment');

class Datas{

    constructor(){
        this.myDateInicial = moment().subtract(3, "days").format('YYYYMMDD');
        this.myDateFinal = moment().subtract(1, "days").format('YYYYMMDD');
    }

    getDataInicial(){
        return this.myDateInicial;
    }

    getDataFinal(){
        return this.myDateFinal;
    }
}

module.exports = Datas