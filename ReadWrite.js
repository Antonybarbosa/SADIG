const fs = require('fs');

//let texto = "Este é o texto que usaremos como exemplo para salvar em nosso arquivo txt."
//let texto2 = "Este é o texto que usaremos como exemplo para salvar em nosso arquivo txt."

class writeFile{

    
  
     writeDocumento( texto ) {
       
        fs.writeFile('newfile'+'.txt', texto, function (err) {
          if (err) throw err;
          console.log('Arquivo Criado');
        });

        return null
        
  };
    readDocumento(){

        fs.readFile('newfile.txt', 'utf-8', function(err, contents){
            if (err) throw err;
            console.log(contents);
        })

  };

}

module.exports = writeFile



