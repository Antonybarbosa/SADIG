const consulta = require('../sankhya/consultaSnk')
const sqlFarmina = require('./sqlFarmina')
const ftp = require('../EnviarSFTP')
const fs = require('fs');
const datefns = require("date-fns");
const arq =  require('../gerarArquivo/criarArquivo')

class envioFarmina{

    //dataAtual = datefns.format(new Date('2022/01/01'), "yyyyMMdd");
    //dataFinal = datefns.format(new Date('2022/01/31'), "yyyyMMdd");
    dataAtual = datefns.format(new Date(), "yyyyMMdd");
    dataFinal = datefns.format(new Date(), "yyyyMMdd");
    gravar ;
    cabecario = new sqlFarmina().cabeçarioPdv;
    sqlPDV = new sqlFarmina().sqlPdv;
    sqlSellout = new sqlFarmina().selloutFarmina(this.dataAtual,this.dataFinal)
    config = new sqlFarmina().config;
    gravar = this.cabecario+'\n';
    docname = 'ACC_SELLOUT_' + this.dataAtual;
    
    
    async enviarSell(){

          var config = new sqlFarmina().config; 
          //var gravar = new sqlFarmina().cabecarioSellout(this.dataAtual,this.dataAtual)+'\n';
          var gravar = new sqlFarmina().cabecarioSellout(this.dataAtual,this.dataFinal)+'\n';
          var docname = 'ACC_SELLOUT_' + this.dataAtual;
          var resposta =   await new consulta().consulta(this.sqlSellout).then(function(res){

        return res
          
      });


        if (resposta != null){
        resposta.forEach(function(nome) {
                gravar = gravar + nome+'\n'
                //console.log(gravar);
              
                //console.log(dados)
        });
        
        gravar = gravar + 'E';

        //console.log(gravar)
        await new arq().criarArquivo(gravar,'farminasell'+this.dataAtual,config,docname,'')  
      }else{
          console.log('Nenhum dado gerado! - ' + new Date())
      }
    }

    async enviarPDV(){

      
      var config = new sqlFarmina().config;
      var gravar = new sqlFarmina().cabeçarioPdv+'\n';
      var docname = 'ACC_PDVS_' + this.dataAtual;
      var resposta =   await new consulta().consulta(this.sqlPDV).then(function(res){

      return res
        
    });


      if (resposta != null){
      resposta.forEach(function(nome) {
              gravar = gravar + nome+'\n'
              //console.log(gravar);
            
              //console.log(dados)
      });
      gravar = gravar + 'E';
      //console.log(gravar)
      await new arq().criarArquivo(gravar,'farminaPDV'+this.dataAtual,config,docname,'')  
    }else{
        console.log('Nenhum dado gerado! - ' + new Date())
    }

    }
}

module.exports = envioFarmina;
