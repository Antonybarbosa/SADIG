var data 

class agendador{
     
    StopStarSchedule(arraY){
        data  = new Date();
        if (data.getDay() > '0' && data.getDay() < '6'){

            if( data.getHours() > '18' &&  data.getHours() < '8'){
                    arraY[7].stop();
                    arraY[6].stop();
                    console.log('liberação inativa ->  ' +  data.getHours()+':'+data.getMinutes())
            }else{
               
                arraY[7].start();
                arraY[6].start();
                console.log('liberação ativa  ->  ' +  data.getHours()+':'+data.getMinutes())
            }                
              

        }else{
               
            arraY[7].start();
            arraY[6].start();
            arraY[8].start();
            console.log('liberação ativa  ->  ' +  data.getHours()+':'+data.getMinutes())
        }           
        //console.log(arraY[7])
    }

    async embendDiscord(dados, titulo, descricao,Thumbnail ){
         //console.log('dados do Embed enviado :' + await dados)
            const exampleEmbed = {
                color: 0x000000,
                title: titulo,
                url: '',//https://imgur.com/M3hZVRm.png'',
                /*author: {
                    
                    name: 'Sankhya',
                    icon_url: 'https://i.imgur.com/AfFp7pu.png',
                    url: 'https://discord.js.org',
                },*/
                description: descricao,
                thumbnail: {
                    url: Thumbnail ,
                },
                fields:  await dados,
                /*image: {
                    url: 'https://imgur.com/M3hZVRm.png',
                },*/
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Bot Inovacegroup',
                    //icon_url: 'https://assets.agilecdn.com.br/images/logo_nnpessoa.png?v=690.png'//'https://imgur.com/M3hZVRm.png',//'https://i.imgur.com/AfFp7pu.png',
                },
            };
            

            //console.log(exampleEmbed)
            return exampleEmbed
        }
}


module.exports = agendador;