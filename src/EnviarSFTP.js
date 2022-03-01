const Client = require('ssh2-sftp-client');
const fs = require('fs');
const ftp = require("basic-ftp")
//const whatsapp = require('./src/whatsapp')
//const what = new whatsapp('Enviado para: ', 'Antony', null);

class EnviarSFTP{

  sftp = new Client;

    constructor({host, port, username, password, list, docname, data}){    

        this.config = {

            host: host,
            port: port,
            username: username,
            password: password
        }

         
         
    }

    
        enviarSFTP(){
          
        this.sftp.connect(this.config)
            .then(() => {
              
              return this.sftp.list(this.list);
            })
            .then(async() => {

              dataEnv = fs.createReadStream(this.data);
                 
              return await this.sftp.put(dataEnv, this.docname);
              
            })
            .then(data => {
              console.log('Data',data);
            })
            .then(async () => {

              console.log('Fechou SFTP');
              this.sftp.end();
              
              //await what.EnviaContato('Arquivo enviando! '+dados)  
              
            })
            .catch(async err => {

              console.error('Deu Erro: ',err.message);
              //return await what.EnviaContato(err.message);
              
            });

            //return what.EnviaContato('Preparando arquivo! ')
        }

        enviaFTP(){
          

            this.sftp.connect(this.config)
                
              .then(() => {
                
                return this.sftp.list('/');
              })
              .then(async() => {
  
                data = fs.createReadStream('newfile.txt');
                dados = `/CDRC-OLINDA${myDateFinal}.txt`;                     
                return await this.sftp.put(data, dados);
                
              })
              .then(data => {
                console.log('Data',data);
              })
              .then(async () => {
  
                console.log('Fechou SFTP');
                this.sftp.end();
                
                //await what.EnviaContato('Arquivo enviando! '+dados)  
                
              })
              .catch(async err => {
  
                console.error('Deu Erro: ',err.message);
                return //await what.EnviaContato(err.message);
                
              });
  
              
              
                  return //await what.EnviaContato('Preparando arquivo! ')   
      }
        
      async sendFtp(mydate, docname, data) {
        const client = new ftp.Client()
        client.ftp.verbose = true
        try {
            await client.access({
                host: this.config.host,
                port: 20,
                user: this.config.username,
                password: this.config.password,
                secure: true,
                secureOptions:{
                  rejectUnauthorized: false
                }
            })

           
            await client.uploadFrom(`${data}`, `${docname}${mydate.toString()}.txt`)
            //await client.downloadTo("README_COPY.md", "README_FTP.md")
        }
        catch(err) {
            console.log(err)
        }
        client.close()
    }
                 
}

module.exports = EnviarSFTP