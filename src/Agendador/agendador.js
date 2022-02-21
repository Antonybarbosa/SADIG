var  cron  =  require ( 'node-cron' ) ;

class agendador{

    agenda(funcao, min, hr, value){
        
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

}


module.exports = agendador;