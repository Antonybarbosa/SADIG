var axios = require("axios");
var https = require('https')
const fs = require('fs')
const path = require('path')

class logintoken{

    

      async tokenSankhya() {
        var agent = new https.Agent({ 
            requestCert: false,
            rejectUnauthorized: false,
            ca: fs.readFileSync(path.join(__dirname,'cert','cert.pem')),
            cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
          });
        

        return await  axios.post('https://nnpessoa.nuvemdatacom.com.br:9461/mge/service.sbr?serviceName=MobileLoginSP.login&outputType=json',
       
        {
            "serviceName": "MobileLoginSP.login",
            "requestBody": {
                    "NOMUSU": {
                        "$": "ANTONY"
                    },
                    "INTERNO":{
                    "$":"JESUS2014"
                    },
                "KEEPCONNECTED": {
                    "$": "S"
                }
            }
        },
        //{ httpsAgent: agent }
        ).then(function(resposta){

            console.log('Status login: ' + resposta.status);
            //console.log(resposta.data.responseBody);
        
            return resposta.data.responseBody.jsessionid.$
            
        }).catch(function (error) {

            console.log('Deu erro no login:  ' +error);
          });

    }

}

module.exports = logintoken;