var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'Sadig-Web-NNPessoa',
  description: 'Serviço que envia para SFTP da RoyalCanin',
  script: 'D:\\Projeto\\AutoSadig\\Sadig\\index.js'
}); 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
svc.uninstall();
//svc.install();