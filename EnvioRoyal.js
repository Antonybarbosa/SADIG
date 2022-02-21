const Client = require('ssh2-sftp-client');
const tratar = require('./src/statement_sadig');
const fs = require('fs');
const db = require('./db');
const moment = require('moment');
//const whatsapp = require('./src/whatsapp');
const comando = require('./src/comando');
const Cron = require('node-cron');
const express = require("express");
//app = express();
//const what = new whatsapp('Enviado para: ', 'Antony', null);

let sftp = new Client;
let dados;

const config = {

  host: '20.36.242.7',
  port: 22,
  username: 'FTP_BR_INT_PERFOMA',
  password: 'bK5E2zeb3usOcT9/kTksbrkXjTycpnbNHgCY5VlX'

};

var myDateInicial = moment().subtract(3, "days").format('YYYYMMDD');//('20200709');
console.log(myDateInicial);

//('20200709');

var myDateFinal = moment().subtract(1, "days").format('YYYYMMDD');//('20200725');
//moment().format('YYYYMMDD')-1;
//('20200725');
console.log(myDateFinal)
var select = new comando().getselect()
  
async  function buscar_dados(){
    //await what.EnviaContato('Preparando arquivo! ')
    db.raw( select , 
    [myDateInicial,myDateFinal]) 
    //db('TGFPAR')
    //.select('TGFPAR.CODPARC','TGFPAR.RAZAOSOCIAL', 'TGFPAR.CGC_CPF', 'TGFPAR.DTCAD','TGFRPV.CODVEND')
    //.innerJoin('TGFRPV','TGFPAR.CODPARC','TGFRPV.CODPARC') 
    //.whereNotNull('TGFRPV.CODVEND')
    //.where({})
    //.whereRaw('TO_CHAR(TRUNC(TGFPAR.DTCAD),\'YYYYMMDD\') BETWEEN ? AND ?',[(myDateInicial),(myDateFinal)])
    // .andWhere('TGFRPV.CODVEND', 12)
    //.limit(6)
    .then(function (res){
      criarArquivo(dados = JSON.stringify(res,null, '\t'))
    } )
        .catch(function(error) {
            console.error('Erro no Knex', error);
          })
    .finally(() => db.destroy(), console.log('Fechou Conexao'))

  }
  

function criarArquivo(texto) {

    fs.writeFile('newfile'+'.txt', texto, function (err) {
      if (err) throw err;
      ler_arquivo()
    });
     

}

function criarArquivo1(texto) {

  fs.writeFile('newfile'+'.txt', texto, function (err) {
    if (err) throw err;
    console.log('Arquivo Criado');
    
  });
   

}

function ler_arquivo(){
  
  fs.readFile("./newfile.txt" , "utf8", function(err, data){
    if(err){
      return console.log("Erro ao ler arquivo");
    }
    
    var jsonData = JSON.parse(data); // faz o parse para json

      /**Se precisar em array use:**/

      //jsonData = Object.values(jsonData);
      
      
      let dados;
      let gravar;
      for (var property in jsonData){

        var CNPJEMITENTE = jsonData[property].CNPJEMITENTE.toString();
        CNPJEMITENTE  = new tratar(CNPJEMITENTE,14);

        var RAZAOEMITENTE = jsonData[property].RAZAOEMITENTE.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        RAZAOEMITENTE = new tratar(RAZAOEMITENTE,50);

        var CNPJ = jsonData[property].CNPJ.toString();
        CNPJ = new tratar(CNPJ,14);

        var NOME = jsonData[property].NOME.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        NOME = new tratar(NOME,60)

        var ENDERECO = jsonData[property].ENDERECO.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        ENDERECO = new tratar(ENDERECO,50)

        var MUNICIPIO = jsonData[property].MUNICIPIO.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        MUNICIPIO = new tratar(MUNICIPIO, 50)

        var CEP = jsonData[property].CEP.toString()
        CEP = new tratar(CEP,8)

        var ESTADO = jsonData[property].ESTADO.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        ESTADO = new tratar(ESTADO, 2)

        var TELEFONE = jsonData[property].TELEFONE.toString()
        TELEFONE = new tratar(TELEFONE, 20)

        var NOMECATEGORIA1 = jsonData[property].NOMECATEGORIA1.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        NOMECATEGORIA1 = new tratar(NOMECATEGORIA1, 40)

        var DESCRICAO_CFOP = jsonData[property].DESCRICAO_CFOP.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        DESCRICAO_CFOP = new tratar(DESCRICAO_CFOP, 15)

        var REFERENCIA = jsonData[property].REFERENCIA.toString()
        REFERENCIA = new tratar(REFERENCIA,14)

        var DESCRICAO_PRODUTO = jsonData[property].DESCRICAO_PRODUTO.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        DESCRICAO_PRODUTO = new tratar(DESCRICAO_PRODUTO, 50)

        var QUANTIDADE = jsonData[property].QUANTIDADE.toString()
        QUANTIDADE = new tratar(QUANTIDADE, 6)

        var EMISSAO = jsonData[property].EMISSAO.toString()
        EMISSAO = new tratar(moment(EMISSAO,'DD/MM/YYYY').format("DDMMyyyy"), 10)

        var CODIGOVENDEDOR = jsonData[property].CODIGOVENDEDOR.toString()
        CODIGOVENDEDOR = new tratar(CODIGOVENDEDOR, 20)

        var NOMEVENDEDOR = jsonData[property].NOMEVENDEDOR.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        NOMEVENDEDOR = new tratar(NOMEVENDEDOR, 30)

        var EMAIL = jsonData[property].EMAIL
        EMAIL = new tratar(EMAIL, 30)

        var NOMEPARC = jsonData[property].NOMEPARC.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        NOMEPARC = new tratar(NOMEPARC, 40) 

        var CODPARCMATRIZ = jsonData[property].CODPARCMATRIZ.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        CODPARCMATRIZ = new tratar(CODPARCMATRIZ, 40)

        var NUMNOTA = jsonData[property].NUMNOTA.toString()
        NUMNOTA = new tratar(NUMNOTA, 20)

        var CHAVENFE = jsonData[property].CHAVENFE.toString()
        CHAVENFE = new tratar(CHAVENFE, 50)

        var VLRUNIT = jsonData[property].VLRUNIT
        VLRUNIT = new tratar(VLRUNIT, 15)
        var VLRUNITFORMATADO = VLRUNIT.espacamento().toLocaleString('pt-BR', { minimumFractionDigits: 2});

        dados = CNPJEMITENTE.espacamento()+
                RAZAOEMITENTE.espacamento()+
                CNPJ.espacamento()+
                NOME.espacamento()+
                ENDERECO.espacamento()+
                MUNICIPIO.espacamento()+
                CEP.espacamento()+
                ESTADO.espacamento()+
                TELEFONE.espacamento()+
                NOMECATEGORIA1.espacamento()+
                DESCRICAO_CFOP.espacamento()+
                REFERENCIA.espacamento()+
                DESCRICAO_PRODUTO.espacamento()+
                QUANTIDADE.espacamento()+
                EMISSAO.espacamento()+
                CODIGOVENDEDOR.espacamento()+
                NOMEVENDEDOR.espacamento()+
                EMAIL.espacamento()+
                NOMEPARC.espacamento()+
                CODPARCMATRIZ.espacamento()+
                NUMNOTA.espacamento()+
                CHAVENFE.espacamento()+
                VLRUNITFORMATADO+'\n'

                gravar = gravar+dados

      }
      if(gravar !== undefined){   
        gravar = gravar.replace(undefined,'')+'!@#$'   
        criarArquivo1(gravar) 
        //enviarSFTP()     
      }
      

  });
}
    
       async function enviarSFTP(){

          sftp.connect(config)
            .then(() => {
              
              return sftp.list('/IN/CDRC-OLINDA');
            })
            .then(async() => {

              data = fs.createReadStream('newfile.txt');
              dados = `/IN/CDRC-OLINDA/CDRC-OLINDA${myDateFinal}${moment().format('HHmm')}.txt`;                     
              return await sftp.put(data, dados);
              
            })
            .then(data => {
              console.log('Data',data);
            })
            .then(async () => {

              console.log('Fechou SFTP');
              sftp.end();
              
              //await what.EnviaContato('Arquivo enviando! '+dados)  
              
            })
            .catch(async err => {

              console.error('Deu Erro: ',err.message);
              return //await what.EnviaContato(err.message);
              
            });

            
            
                return //await what.EnviaContato('Preparando arquivo! ')   
    }

    
    
    buscar_dados()
    //Cron.schedule("*/5 * * * *", 
      //() =>  {buscar_dados() //,console.log("Executando a tarefa a cada 5 minuto")
    //});

    //app.listen(1313);