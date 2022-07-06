

class sqlFarmina{
    
    cabeçarioPdv = 'H;70220470000146;'
    rodape = 'E'
    sqlPdv = `
    SELECT 'V' || ';' || PAR.CGC_CPF || ';' || PAR.RAZAOSOCIAL || ';' || PAR.NOMEPARC || ';' || 
    'BRA' || ';' || 'NE' || ';' || UF.UF || ';' || CID.NOMECID || ';' || BAI.NOMEBAI || ';' || ENDR.TIPO || '  ' || ENDR.NOMEEND || '  ' || PAR.NUMEND || '  ' || PAR.COMPLEMENTO   || ';' ||
    'Grupo' || ';' || 'Classificação' || ';' || 
    CASE WHEN NVL((SELECT
        VEN.CODVEND
    FROM
        tgfven   ven,
        tgfrpv   rpv
    WHERE
        ven.codvend = rpv.codvend
        AND ven.codemp = 2
        AND tipvend = 'V'
        AND rpv.codparc = PAR.CODPARC AND ROWNUM = 1),0) = 0 THEN 11 ELSE  
        (SELECT
        VEN.CODVEND
    FROM
        tgfven   ven,
        tgfrpv   rpv
    WHERE
        ven.codvend = rpv.codvend
        AND ven.codemp = 2
        AND tipvend = 'V'
        AND rpv.codparc = PAR.CODPARC AND ROWNUM = 1) END || ' - ' || CASE WHEN NVL((SELECT
        VEN.CODVEND
    FROM
        tgfven   ven,
        tgfrpv   rpv
    WHERE
        ven.codvend = rpv.codvend
        AND ven.codemp = 2
        AND tipvend = 'V'
        AND rpv.codparc = PAR.CODPARC AND ROWNUM = 1),0) = 0 THEN 'NADSON FILHO' ELSE  
        (SELECT
        VEN.APELIDO
    FROM
        tgfven   ven,
        tgfrpv   rpv
    WHERE
        ven.codvend = rpv.codvend
        AND ven.codemp = 2
        AND tipvend = 'V'
        AND rpv.codparc = PAR.CODPARC AND ROWNUM = 1) END || ';' || to_char(PAR.DTCAD,'YYYYMMDD') || ';' ||
    PAR.CEP || ';'  || ';' || 'A' as dados
    FROM TGFPAR PAR
    , TSIEND ENDR
    , TSIBAI BAI
    , TSICID CID
    , TSIUFS UF
    
    
    WHERE 
    ENDR.CODEND = PAR.CODEND
    AND BAI.CODBAI = PAR.CODBAI
    AND CID.CODCID = PAR.CODCID
    AND UF.CODUF = CID.UF
    
    AND PAR.ATIVO='S' 
    AND (( DECODE(PAR.CLIENTE, 'S', 'Sim', 'Não') = 'Sim') 
     )
        `;

    config = {

        host: 'distributors.farmina.com',
        port: 20,
        username: 'MeC200911',
        password: '2bP?5w03r'
    
    };    
    
        
cabecarioSellout(dataInicial ,dataFinal){

        console.log('Data função Cabeçario: '+ dataInicial +' dtfinal: ' + dataFinal)
        
        var dados = 'H;70220470000146;'+dataInicial+';'+dataFinal+';';

        return dados
    
    };

selloutFarmina(dataInicial, dataFinal){
           
           console.log(dataInicial +' '+dataFinal)

           var dados = `SELECT
                'V'
                || ';'
                || (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 791)
                || ';'
                || (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 34430)
                || ';'
                || pro.referencia
                || ';'
                || ite.controle
                || ';'
                || TO_CHAR(est.dtval, 'YYYYMMDD')
                || ';'
                || ( ite.qtdneg * 1000 )
                || ';'
                || round((((ITE.QTDNEG*ITE.VLRUNIT) + ITE.VLRIPI + ITE.VLRSUBST - ITE.VLRDESC - ITE.VLRREPRED) * 100), 0)
                || ';'
                || 'BRL'
                || ';'
                || cab.numnota
                || ';'
                || TO_CHAR(cab.dtfatur, 'YYYYMMDD')
                || ';'
                || CASE WHEN TPO.TIPMOV = 'V' AND TPO.deScroper NOT like'%BONI%'THEN 'V' WHEN TPO.TIPMOV = 'V' AND TPO.deScroper like'%BONI%' THEN 'B' ELSE TPO.TIPMOV END
                || ';'
                || ite.codcfo
                || ';'
                || CASE
                    WHEN par.tippessoa = 'F' THEN 1
                    ELSE 2
                END
                || ';'
                || par.cgc_cpf
                || ';'
                || par.razaosocial
                || ';'
                || par.cep
                || ';'
                || 'CLASS PDV'
                || ';'
                || ven.codvend
                || ' - '
                || ven.apelido
                || ';'
                || ';'
                AS DADOS
            FROM
                tgfcab cab,
                tgfpar par,
                tgfite ite,
                tgfpro pro,
                tgftop tpo,
                tgfven ven,
                tgfest est
            WHERE
                    cab.codparc = par.codparc
                AND est.codprod = ite.codprod
                AND EST.CONTROLE = ite.controle
                AND EST.CODEMP = CAB.CODEMP
                AND cab.nunota = ite.nunota
                AND ite.codprod = pro.codprod
                AND cab.codtipoper = tpo.codtipoper
                AND cab.dhtipoper = tpo.dhalter
                AND cab.codvend = ven.codvend
                AND pro.marca = 'FARMINA'
                AND  TO_CHAR(TRUNC(CAB.DTFATUR),'yyyyMMdd') >= TO_CHAR(TRUNC(SYSDATE-15),'yyyyMMdd')
                AND  TO_CHAR(TRUNC(CAB.DTFATUR),'yyyyMMdd') <= TO_CHAR(TRUNC(SYSDATE),'yyyyMMdd')
                AND cab.tipmov IN ('V','D')
                AND cab.statusnota = 'L'
                AND pro.codgrupoprod <= 5999999
                AND cab.codemp = 2
                AND cab.codtipoper NOT IN (701,702,705,708,710,711,712,717)
                GROUP BY

                pro.referencia
                ,
                ite.controle
                ,
                TO_CHAR(est.dtval, 'YYYYMMDD')
                ,
                ( ite.qtdneg * 1000 )
                ,
                round((((ITE.QTDNEG*ITE.VLRUNIT) + ITE.VLRIPI + ITE.VLRSUBST - ITE.VLRDESC - ITE.VLRREPRED) * 100), 0)
                ,
                cab.numnota
                ,
                TO_CHAR(cab.dtfatur, 'YYYYMMDD')
                ,
                CASE WHEN TPO.TIPMOV = 'V' AND TPO.deScroper NOT like'%BONI%'THEN 'V' WHEN TPO.TIPMOV = 'V' AND TPO.deScroper like'%BONI%' THEN 'B' ELSE TPO.TIPMOV END 
                ,
                ite.codcfo
                ,
                CASE
                    WHEN par.tippessoa = 'F' THEN 1
                    ELSE 2
                END
                ,
                par.cgc_cpf
                ,
                par.razaosocial
                ,
                par.cep
                ,
                ven.codvend

                , ven.apelido,
                ITE.SEQUENCIA`;

                return dados
        }
    
      
}

module.exports = sqlFarmina;