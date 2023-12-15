const consulta = require('../sankhya/consultaSnk')
const sql = require('./sqlliberacao')
const msgDiscord = require('./discord')

var id;
let msg;
var idCom;
var idres;
var msgCom;
var data = new Date();


class consultalib{
    
    async consultarResultadoLib(dados, campo1, campo2){
        let obj =[];

    var resposta =   await dados;
                 
   if (resposta != null){
                
     resposta.forEach(async function(nome) { 
            
             obj.push(
                 {
                     name:'',
                     value:'',
                     inline: false,
                 })       // quebra alinhas entre os itens
             obj.push({
                 name: campo1,
                 value: nome[0],
                 inline:true,
                 
             })
             obj.push({
                 name: campo2,
                 value:  nome[1],
                 inline: true,
             })
             

         });  
             
   }
   //console.log(obj)
   
   return obj
}
}

class envioliberacao{
   
    
    async liberacoesPedentesFin(){
        let gravar;
        console.error('********************')

        const setor = 'Financeiro - Liberação Pendente!'
        const descricao = 'Analisar o quanto antes, isso impacta no tempo para atender o nosso cliente. Obrigado!'
        const campo1 = 'Descricao do evento'
        const campo2 = 'Qtd / Tempo Aguardando'
        const Thumbnail = 'https://imgur.com/M3hZVRm.png'
        console.log(setor)
        
        var sqlliberacao =  
        `SELECT
        
           ':dart: ' ||eve.descricao,
           
           ':pencil:' || to_char(COUNT(lib.nuchave),'000')  ||' /  :hourglass: ' ||
           TI_NNPESSOA_TEMPO('','',  (SYSDATE - MIN(lib.dhsolicit))) AS tempo
   
       FROM
           tsilib      lib,
           vgflibeve   eve
       WHERE
           lib.evento = eve.evento AND 
           EVE.EVENTO  IN (3,8,9,15,29)
           AND dhlib IS NULL
           AND lib.dhsolicit >= trunc(SYSDATE, 'MM')
       
       GROUP BY
           LIB.EVENTO, EVE.DESCRICAO   `;    

     var resposta =   await new consulta().consulta(sqlliberacao).then(function(res){

        return res
          
      });

      if (resposta != null){
             resposta.forEach(async function(nome) {            
                 gravar = gravar + nome+'\n'
                
                return 
            });  
                
                msg = gravar.replace('undefined','');
                console.log('Rest :' +msg)
                id = await  new msgDiscord().enviarMsgDiscord(msg, id, new consultalib().consultarResultadoLib(resposta,campo1,campo2 ), setor, descricao, Thumbnail)
                
                msg = ''
                console.error('********************')
         }else{
                
                msg = ''
                console.log('Nenhum liberacao encontrada')
                await  new msgDiscord().enviarMsgDiscord('', id)                
                console.error('********************')
      }
    }

    async liberacoesPedentesCom(){
        console.error('********************')
        console.log( data.getDate());
        const setor = 'Comercial - Liberação Pendente!'
        const descricao = 'Analisar o quanto antes, isso impacta no tempo para atender o nosso cliente. Obrigado!'
        const campo1 = 'Descricao do evento'
        const campo2 = 'Qtd / Tempo Aguardando'
        const Thumbnail = 'https://imgur.com/M3hZVRm.png';
        console.error(setor)
        let gravar;

        var sqlliberacao =  
        `SELECT
        
           ':dart: ' ||eve.descricao,
           
           ':pencil:' || to_char(COUNT(lib.nuchave),'000')  ||' /  :hourglass: ' ||
           TI_NNPESSOA_TEMPO('','',  (SYSDATE - MIN(lib.dhsolicit))) AS tempo
   
       FROM
           tsilib      lib,
           vgflibeve   eve
       WHERE
           lib.evento = eve.evento AND 
           EVE.EVENTO  NOT IN (3,8,9,15,29)
           AND dhlib IS NULL
           AND lib.dhsolicit >= trunc(SYSDATE, 'MM')
       
       GROUP BY
           LIB.EVENTO, EVE.DESCRICAO   `;  

    var resposta =   await new consulta().consulta(sqlliberacao).then(function(res){

        return res
          
      });

      console.log('res: '+resposta)
      
      if (resposta != null){
        resposta.forEach(async function(nome) { 
                         
                 gravar = gravar + nome+'\n'

            });  
                msgCom = gravar.replace('undefined','');
                idCom = await  new msgDiscord().enviarMsgDiscord(msgCom, idCom, new consultalib().consultarResultadoLib(resposta,campo1,campo2 ), setor, descricao, Thumbnail)
                
                msgCom = ''
                console.error('********************')
         }else{          
          
          console.log('Nenhum liberacao encontrada')
          await  new msgDiscord().enviarMsgDiscord('',idCom)
          console.error('********************')
      }
    }
    
    async ResultadoLibCom(){
        console.error('********************')
        const setor = 'Resumo das Liberações!'
        const descricao = 'Abaixo estão os dados do resultado das liberações!'
        const campo1 = 'Descricao do evento'
        const campo2 = 'Qtd - Média Atual (Semestre)'
        const Thumbnail = ''
        console.error(setor)
        let gravar;

        var sqlliberacao =  
        `SELECT  
        
            ' :vertical_traffic_light: ' || eve.descricao as eventos,
            COUNT(case when dhlib is not null then 
            lib.nuchave end) /*Liberado,*/||' - ' ||
            (select 
            TI_NNPESSOA_TEMPO('','',   avg(libera.dhlib - (libera.dhsolicit))) as max from tsilib libera where libera.evento = lib.evento AND libera.dhlib IS not NULL AND libera.dhsolicit >= trunc(SYSDATE, 'MM')) /*as Media_mes_atual*/
            /*AS MEDIA_D0_MES,*/ || ' ('||         
            (select 
            TI_NNPESSOA_TEMPO('','',   avg(libera.dhlib - (libera.dhsolicit))) as max from tsilib libera where libera.evento = lib.evento AND libera.dhlib IS not NULL AND libera.dhsolicit >= trunc(SYSDATE, 'MM')-180  and libera.dhsolicit < trunc(SYSDATE, 'MM'))/*as Media_Semestre*/
            
            ||') :trident: ' as tempo
        FROM
            tsilib      lib,
            vgflibeve   eve
        WHERE
            lib.evento = eve.evento AND 
            
            dhlib IS not NULL and
            TRUNC(lib.dhsolicit) >= trunc(SYSDATE, 'MM')
        
        GROUP BY
            LIB.EVENTO, EVE.DESCRICAO
            
            order by COUNT(distinct(lib.nuchave)) desc`;  

    var resposta =   await new consulta().consulta(sqlliberacao).then(function(res){

        return res
          
      });

      console.log('res: '+resposta)
      
      if (resposta != null){
        resposta.forEach(async function(nome) { 
                         
                 gravar = gravar + nome+'\n'

            });  
                msgCom = gravar.replace('undefined','');
                idres  = await  new msgDiscord().enviarMsgDiscord(msgCom, idres, new consultalib().consultarResultadoLib(resposta,campo1,campo2 ), setor, descricao, Thumbnail)
         }else{
                
            msgCom = ''
            console.log('Nenhum liberacao encontrada')
            await  new msgDiscord().enviarMsgDiscord('', idres)                
            console.error('********************')
        }
    }
   
    
}

module.exports = envioliberacao;