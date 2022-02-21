var axios = require("axios");
var login = require('./loginSnk');
const https = require('https')
const fs = require('fs')
const path = require('path')

class consultaSnk{
     async consulta(sql){
        var dados;
        var agent = new https.Agent({ 
          requestCert: true,
          rejectUnauthorized: false,
          ca: fs.readFileSync(path.join(__dirname,'cert','cert.pem')),
          cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
        });
         let token = await new login().tokenSankhya().then(async function(res){

            //console.log(res);
            
            var url = 'https://nnpessoa.nuvemdatacom.com.br:9461/mge/service.sbr?serviceName=DbExplorerSP.executeQuery&outputType=json';
            var data =`{
                        "serviceName":"DbExplorerSP.executeQuery",
                        "requestBody": {
                        "sql":"${sql}"
                    }
                }`
                var config = {
                    method: 'get',
                    url: url,
                    headers: { 
                      'Authorization': `Bearer ${res}`, 
                      'Content-Type': 'text/plain', 
                      
                      'Cookie': `JSESSIONID=${res}.master`
                    },
                   
                    data : data,
                    httpsAgent: agent,                 
                      
                  };
                  
                 dados = await axios(config)
                  .then( async function (response) {
                    
                    if(response.status = 200) console.log('Status API sankhya : ' + response.status)
                    
                    //console.log(response.data);
                    if (response.data.responseBody.rows.length !=0 ){
                        //console.log((response.data.responseBody.rows));
                        //console.log(response.res.IncomingMessage.status)
                          return response.data.responseBody.rows
                          
                    }else {
                      console.log('Array de retorno vazio')
                    }
                  }).catch(function (error) {
                    console.log(error);
                  });
                  return dados

        });  

        return token ;

    }
        
  }

  module.exports = consultaSnk;

