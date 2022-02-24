const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()

var  cron  =  require ( 'node-cron' ) ;
const port = 3333;


//const farmina = require('./src/farmina/envioFarmina')
//const cafune = require('./src/cafune/envioCafune')
const farmina = require(path.join(__dirname+"/src/farmina/envioFarmina.js"))
const cafune = require(path.join(__dirname +'/src/cafune/envioCafune.js'))


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


app.use(router)

app.listen(process.env.PORT || port,()=>{
    
    console.log("Servidor rodando")

    agenda(enviarsell, '55', '20',1)
    agenda(enviarsell, '56', '20',2)
    agenda(enviarsell, '57', '20',3)
    agenda(enviarsell, '58', '20',4)
    agenda(enviarsell, '59', '20',5)


}) 