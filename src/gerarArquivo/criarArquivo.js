const ftp = require('../EnviarSFTP')
const fs = require('fs');

class criarArquivo{

     //texto -  são os dados para criar o arquivo
     //caminho = repositorio do arquivo com o nome 
     //config - dados da conexão
     //docname - nome do arquivo enviado para o FTP
     
     criarArquivo(texto, caminho, config,docname, datatual) {
     
        fs.writeFile(caminho+'.txt', texto, function (err) {
          if (err) throw err;
            console.log('Arquivo Criado');
    
            new ftp(config).sendFtp(datatual,docname, caminho+'.txt');      
        });   
      
      };   
}

module.exports = criarArquivo;