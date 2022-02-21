class statement_sadig{

    constructor(dados,qtd){   
        //console.log('Class'); 
        this.dados = dados
        this.qtd = qtd
        //console.log(this.dados, '  ',this.qtd)    
    }
    
    espacamento(){

        if(this.dados == null){
            var dados = 'T';
            
            for (var v=0; v<this.qtd; v++){

                dados = dados +' ';
            }
            return dados.replace('T','')

        }else if(this.dados.length < this.qtd){

            //console.log(this.dados, '  ',this.qtd)
            const total = this.qtd - this.dados.length 
            //console.log('Dados', total)

                for (var v=0; v<total; v++){
                    this.dados = this.dados +' ';
                }
        }
            return this.dados
    }
    
}

module.exports = statement_sadig;