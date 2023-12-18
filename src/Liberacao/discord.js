const { EmbedBuilder, WebhookClient } = require('discord.js')
const agendado = require('../Agendador/agendador')

const urlProdução = 'https://discord.com/api/webhooks/1181275200503943189/lSSs4OqIUSYRjsyi1tH5RwGCVQX0uCth0iUzgiinsb92VOyTqi7G8RfPznnWdutjaOkk';
const urlTeste = 'https://discord.com/api/webhooks/1179855592618217522/df6Vhzo3yt_1WaNFX0OkMKq-WpUW9YEVt2f09s89XeY073DWVMk0Gq4Gmx_afRYvWObL';
const webhookClient = new WebhookClient({
    // Grupo geral do produção
    url: urlTeste
});
   

let id;

class discord{

async enviarMsgDiscord(msg, id_exc, EMBED,titulo, descricao, Thumbnail)  {
    var embend1 = await new agendado().embendDiscord(EMBED,titulo, descricao,Thumbnail)
    
    if (id_exc === 'undefined'){}

    else{

        if (id_exc != null) {
            //console.log('Id Exclusão :'+ id_exc)
            try{
    
                webhookClient.deleteMessage(id_exc)
                             .catch(( error) =>{  
                                console.log('Erro ao excluir Mensagem Discord : '+error)
                                }); 
            }catch( error) {  
            console.log('Erro ao excluir Mensagem Discord : '+error);
          }
          
          //return id 
        }

    }
    
    
    if (msg != ''){
        
        id = await webhookClient.send({
            //content: msg,
            username: titulo,
            avatarURL: 'https://theme.zdassets.com/theme_assets/9618168/9fbfa745557f3851f0417f8bf69e31ac45fdb85c.png',//'https://i.imgur.com/AfFp7pu.png',
            embeds: [embend1],
        }).then(  (d) => {
            console.log(d.id)
            return d.id
        }).catch(( error) =>{                    
            console.log('Erro envio Mensagem2 Discord : '+error);
          })
        
            msg = ''
        return id
        };
        
    }    
}

 module.exports = discord