const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()

var  cron  =  require ( 'node-cron' ) ;
const port = 3333;
var j =[]
var data = new Date();
var agen = require('./src/Agendador/agendador')
//const farmina = require('./src/farmina/envioFarmina')
//const cafune = require('./src/cafune/envioCafune')
const liberacao = require('./src/Liberacao/liberacao')
//const farmina = require(path.join(__dirname+"/src/farmina/envioFarmina.js"))
//const cafune = require(path.join(__dirname +'/src/cafune/envioCafune.js'))


function enviarsell(value){

    if (value == 0 ){
    new farmina().enviarSell();
    }
    if( value == 0){
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
    if(value == 6){
        new liberacao().liberacoesPedentesFin()
    }

    if(value == 7){
        new liberacao().liberacoesPedentesCom()
    }
    if(value == 8){        
        new liberacao().ResultadoLibCom()
    }
    if(value == 1){
        new agen().StopStarSchedule(j)  
    }
    
}


function agenda(funcao, min, hr, value){
    //*/5 * * * * 
    var tk = cron.schedule ( `${min} ${hr} * * *` ,  ( )  =>  { 
        console.log('Entrou na função')
        funcao(value)
        
    } ,  { 
      schedule : true , 
      timezone : "America/Sao_Paulo" ,
      
    } ) ;
    tk.start();
    j[value] = tk
    //return tk.on
    return tk.om
}




router.get("/", (req, res)=> {
    res.json("online")
})

router.get("/cafune", (req,res)=>{
    res.json("iniciando envio cafune");
    res.json(enviarsell(3));
    res.json(enviarsell(4));
    res.json(enviarsell(5));
})
router.get("/farmina", (req,res)=>{
    res.end(console.log(""))
    enviarsell(1);
    enviarsell(2);
})

router.get("/financeiro", (req,res)=>{
    res.end(console.log("Iniciando Financeiro"))
    enviarsell(6);
})
router.get("/comercial", (req,res)=>{
    res.end(console.log("Iniciando Comercial"))
    enviarsell(7);
    j[7].stop();
})

router.get("/resultado", (req,res)=>{
    res.end(console.log("Iniciando Resultado"))
    new liberacao().consultarResultadoLib()
})

app.use(router)

app.listen(process.env.PORT || port,()=>{

    console.log("Servidor rodando")
    
    agenda(enviarsell, '02', '18',1)
    agenda(enviarsell, '00', '08',1)

    //agenda(enviarsell, '* *', '*',1)
    //agenda(enviarsell, '* *', '*',1)

    //agenda(enviarsell, '55', '20',1)
    //agenda(enviarsell, '56', '20',2)
    agenda(enviarsell, '57', '20',3)
    
    agenda(enviarsell, '58', '20',4)
    agenda(enviarsell, '59', '20',5)

    //liberação
    
    agenda(enviarsell, '*/5', '*',6)//Liberação Financeiro
    agenda(enviarsell, ' */10', '*',7)//Liberação Comercial
    agenda(enviarsell, ' 00', '18',8)//Liberação Comercial
}) 