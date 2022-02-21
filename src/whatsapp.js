const wa = require('@open-wa/wa-automate');
const { on } = require('events');
const fs = require('fs')

class whatsapp{
    constructor(mensagem, contato, grupo){
    
        this.mensagem = mensagem 
        console.log('Mensagem',mensagem + contato)
        this.contato = contato
        this.grupo = grupo
        
    }

    async EnviaGrupo (text){
        let contatoenvio;
        const cliente = await wa.create();
        const Allgrupos = cliente.getAllGroups();
        const Allcontatos = cliente.getAllContacts();
        
        const contato =  Object.values( await Allcontatos).filter(r => r.formattedName.indexOf(this.contato) !==-1);
        for(var index = 0; index < contato.length; index++){

            contatoenvio = await contato[index].id.replace('@c.us','');
            console.log('@'+ await contato[index].id.replace('@c.us',''))
        }
        const grupo = Object.values(await Allgrupos).filter(r => r.formattedTitle.indexOf(this.grupo) !==-1)
        if(grupo !== null){

            for(var index = 0; index < grupo.length; index++){
                
                console.log(grupo[index].id)
                //558192329749-1622732343@g.us GRUPO DE VENDAS
                //envia texto simples.
                
                //menciona o usuario
                await cliente.simulateTyping('558192329749-1622732343@g.us', true);
                await cliente.sendTextWithMentions('558192329749-1622732343@g.us','@'+contatoenvio +' '+text, false)
                
                //for(var i = 0; i < 100000; i++){
                //    if (i=100000)
                //    await cliente.sendText(grupo[index].id,'*Bora vender*')
                //}
            }
            /*for(let index = 0; index < this.grupo.length; index++){
                await cliente.sendText(this.grupo[index].id_serialized,mensagem)
            }*/
            
        }
        
        
    }

    async  EnviaContato(texto){
        
        const cliente = await wa.create();        
        const Allcontatos = cliente.getAllContacts();

        const Allgrupos = cliente.getAllGroups();
        this.grupo = Object.values(await Allgrupos).filter(r => r.formattedTitle.indexOf(this.grupo) !==-1)
            console.log( this.grupo);
       
        const contato =  Object.values( await Allcontatos).filter(r => r.formattedName.indexOf(this.contato) !==-1);

        //console.log('contato: ',contato,' this.contato: ', this.contato, contato.length)
        if(contato !== null){    
            //console.log('entrou1', contato)       
            for(var index = 0; index < contato.length; index++){
                
                await cliente.sendText(contato[index].id,texto)
                
            }
        }
    }

}
new whatsapp('olá','Nathiene','Grupo Vendas').EnviaGrupo('olá');
//module.exports = whatsapp

    function enviarMsg(contato, msg, grupo){
        console.log('entrou no timeout');
        if (grupo !== null){

            new whatsapp('olá',contato,grupo).EnviaGrupo(msg);//envio para o grupo

        }//else if(contato !== null){

           // new whatsapp('olá',contato,grupo).EnviaContato(contato);//envio no particular
        //}
        
    }

    function myFunc() {
        
        new whatsapp('olá','Nathiene','Grupo Vendas').EnviaGrupo('olá')
        console.log(Date.now() );
        console.log('entrou no setInterval');
        setTimeout(enviarMsg,60000,'Nathiene', 'Resultado do dia está ótimo','Grupo Vendas');
    }
  
    setInterval(myFunc, 180000);//intervalo de 3 minutos