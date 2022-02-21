const consulta = require('../sankhya/consultaSnk')
const sql = require('./sqlCafune')
const datefns = require("date-fns");
const arq =  require('../gerarArquivo/criarArquivo')

class envioCafune{

    dataAtual = datefns.format(new Date(), "yyyyMMdd");
        
    async enviarSell(){
         
          var dataAtual = datefns.format(new Date(), "yyyyMMdd");
          var sqlSellout = new sql().sellout(dataAtual,dataAtual);
          var config = new sql().config;
          
          var docname = 'SELLOUT_V1_' + datefns.format(new Date(), "yyyyMMddHHmmss");
          
          var gravar = new sql().cabecarioSelloutt+'\n';

          var resposta =   await new consulta().consulta(sqlSellout).then(function(res){

        return res
          
      });


        if (resposta != null){
        resposta.forEach(function(nome) {
                gravar = gravar + nome+'\n'
                //console.log(gravar);
              
                //console.log(dados)
        });  
        //console.log(gravar)
        await new arq().criarArquivo(gravar,'cafunesell'+dataAtual,config,docname,'')  
      }else{
          console.log('Nenhum dado gerado! - ' + datefns.format(new Date(), "yyyyMMddHHmmss"))
      }
    }

    async enviarPainel(){

        var dataAtual = datefns.format(new Date(), "yyyyMMdd");
        var Sql = new sql().sqlPainel;
        var config = new sql().config;
        
        var docname = 'PAINEL_V1_' + datefns.format(new Date(), "yyyyMMddHHmmss");
        
        var gravar = new sql().cabecarioPainel+'\n';
      var resposta =   await new consulta().consulta(Sql).then(function(res){

      return res
        
    });


      if (resposta != null){
      resposta.forEach(function(nome) {
              gravar = gravar + nome+'\n'
              //console.log(gravar);
            
              //console.log(dados)
      });
      
      //console.log(gravar)
      await new arq().criarArquivo(gravar,'cafunePainel'+dataAtual,config,docname,'')  
    }else{
        console.log('Nenhum dado gerado! - ' + new Date())
    }

    }

    async enviarEstoque(){

      var dataAtual = datefns.format(new Date(), "yyyyMMdd");
      var Sql = new sql().sqlEstoque;
      var config = new sql().config;
      
      var docname = 'ESTOQUE_V1_' + datefns.format(new Date(), "yyyyMMddHHmmss");
      
      var gravar = new sql().cabecarioEstoque+'\n';
    var resposta =   await new consulta().consulta(Sql).then(function(res){

    return res
      
  });


    if (resposta != null){
    resposta.forEach(function(nome) {
            gravar = gravar + nome+'\n'
            //console.log(gravar);
          
            //console.log(dados)
    });
    
    //console.log(gravar)
    await new arq().criarArquivo(gravar,'cafunePainel'+dataAtual,config,docname,'')  
  }else{
      console.log('Nenhum dado gerado! - ' + new Date())
  }

  }
}

module.exports = envioCafune;
