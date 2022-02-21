const fs = require('fs');
const tratar = require('./src/statement_sadig');

class Arquivos{

    

    construtor(nomeDocumento, texto){
        this.dados;
        this.gravar;
    }

    criarAquivo(nomeDocumento, texto){

        fs.writeFile(nomeDocumento+'.txt', texto, function (err) {
            if (err) throw err;
            console.log('Arquivo Criado');
            
          });

    }
     
    lerArquivo(nomeDocumento){
       

        fs.readFile('./'+nomeDocumento+'.txt' , "utf8", function(err, data){

            if(err){
              return console.log("Erro ao ler arquivo");
            }

            var jsonData = JSON.parse(data); // faz o parse para json

      /**Se precisar em array use:**/

      //jsonData = Object.values(jsonData);
      
      
      
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

        this.dados = CNPJEMITENTE.espacamento()+
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

                this.gravar = this.gravar+this.dados

      }

        });
        if(this.gravar !== undefined){   
            this.gravar = this.gravar.replace(undefined,'')+'!@#$'   
            //criarArquivo1(gravar) 
            //enviarSFTP()     
          }
        return this.gravar
    }
}

module.exports = Arquivos