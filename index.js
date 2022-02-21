const http  = require('http')
var  cron  =  require ( 'node-cron' ) ;
const hostname = "localhost";
const port = 3333;


const farmina = require('./src/farmina/envioFarmina')
const cafune = require('./src/cafune/envioCafune')


function enviarsell(value){

    if (value == 1 ){
    new farmina().enviarSell();
    }
    if( value == 2){
    new farmina().enviarPDV();
    }
    if(value == 3){
        new cafune().enviarSell();
    }
    if(value == 4){
        new cafune().enviarPainel();
    }
    if(value == 5){
        new cafune().enviarEstoque();
    }
    
}


function agenda(funcao, min, hr, value){
    
    var tk = cron.schedule ( `${min} ${hr} * * *` ,  ( )  =>  { 
        console.log('Entrou na função')
        funcao(value)
    } ,  { 
      schedule : true , 
      timezone : "America/Sao_Paulo" 
    } ) ;
    tk.start();

    return tk.on

}


agenda(enviarsell, '55', '17',1)
agenda(enviarsell, '56', '17',2)
agenda(enviarsell, '57', '17',3)
agenda(enviarsell, '58', '17',4)
agenda(enviarsell, '59', '17',5)

const server = http.createServer((req, res)=>{
    res.setHeader("Content-type", "text-plain"),
    res.end("hello world")
})

server.listen(port, hostname, ()=>{
    agenda(enviarsell, '55', '17',1)
    agenda(enviarsell, '56', '17',2)
    agenda(enviarsell, '55', '17',3)
    agenda(enviarsell, '58', '17',4)
    agenda(enviarsell, '59', '17',5)
    console.log("Servidor rodando")
})