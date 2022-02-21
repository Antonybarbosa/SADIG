const db = require('./db');

class Consulta{
     result;
    constructor(){
        
    }
    getDados(){

            db.raw( select , 
            [myDateInicial,myDateFinal]) 
            .then(function (res){
                result = res
                //criarArquivo(result = JSON.stringify(res,null, '\t'))
            } )
                .catch(function(error) {
                    console.error('Erro no Knex', error);
                })
            .finally(() => db.destroy(), console.log('Fechou Conexao'))

            criarArquivo(dados = JSON.stringify(res,null, '\t'))

            return result
    }

  }