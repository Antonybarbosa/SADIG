class sqlcafune{

    cabecarioEstoque = 'CNPJ_Filial_Distribuidor|CNPJ_Industria|Data_Posicao|EAN|DUN|Cod_interno|Cod_Lote|Data_Validade|Nome_produto|Unidade_Venda|Fator_Para_Pacote|Preco_Sku_TABELA|Preco_Sku_CUSTO|Estoque_Fisico|Estoque_Transito|Estoque_Faturado|Estoque_Avariado|Estoque_Reservado';
    cabecarioPainel = 'CNPJ_Distribuidor|CNPJ_Industria|Cod_Divisao_Industria|CNPJ_PDV|Nivel_1_Codigo|Nivel_1_Nome|Nivel_1_Codigo_Fiscal|Nivel_1_Email|Nivel_1_Celular|Nivel_2_Codigo|Nivel_2_Nome|Nivel_2_Codigo_Fiscal|Nivel_2_Email|Nivel_2_Celular|Nivel_3_Codigo|Nivel_3_Nome|Nivel_3_Codigo_Fiscal|Nivel_3_Email|Nivel_3_Celular';
    cabecarioSelloutt = 'CNPJ_Filial_Distribuidor|CNPJ_Industria|Data_Nota_Fiscal|Numero_Nota_Fiscal|Chave_NFE|EAN|Cod_interno|Nome_Produto|Unidade_Venda|Fator_Para_Pacote|Tipo_Documento|Tipo_Envio|VendaValorBruta|VendaValorLiquida|VendaUnidades|Preco_Sku_NF|Canal_Venda|Cod_Vendedor_Hierarquia|Cod_Fiscal_Vendedor|CNPJ_PDV|Formato_PDV|Razao_Social|UF|Municipio|CEP|Endereco|Numero';

    sqlEstoque =      `SELECT DISTINCT 
    (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 791) || '|' ||
    (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 34430) || '|' ||
    TO_CHAR(SYSDATE,'YYYYMMDD')|| '|' ||
    TGFPRO.REFERENCIA || '|' ||
    '' || '|' ||
    TGFPRO.CODPROD || '|' ||
    TGFEST.CONTROLE || '|' ||
    TO_CHAR(TGFEST.DTVAL,'YYYYMMDD') || '|' ||
    TGFPRO.DESCRPROD || '|' ||
    TGFPRO.CODVOL || '|' ||
    TGFVOA.MULTIPVLR || '|' ||
    ltrim(to_char(( OBTEM_PRECO_CW(TGFPRO.CODPROD,0) ), '99999D99', 'NLS_NUMERIC_CHARACTERS='',.''')) || '|' ||
    ltrim(to_char(TGFCUS.CUSREP, '99999D99', 'NLS_NUMERIC_CHARACTERS='',.''')) || '|' ||
    TGFEST.ESTOQUE || '|' ||
    NVL(TGFEST.QTDPEDPENDEST,0) || '|' ||
    '0' || '|' ||
    '0'  || '|' ||
    TGFEST.RESERVADO
    AS DADOS
        FROM TGFPRO
        INNER JOIN TGFEST 
        ON TGFEST.CODPROD = TGFPRO.CODPROD
        INNER JOIN TGFVOA  
        ON TGFVOA.CODPROD = TGFPRO.CODPROD
        INNER JOIN TGFCUS 
        ON TGFCUS.CODPROD = TGFPRO.CODPROD
        WHERE 
            TGFPRO.CODPARCFORN = 34430
        AND TGFEST.CODEMP = 2
        --AND TGFEST.CODLOCAL = 211
        AND TGFVOA.ATIVO = 'S'
        AND TGFCUS.dtatual = (
        SELECT
            MAX(c.dtatual)
        FROM
            tgfcus c
        WHERE
            c.codprod = TGFCUS.codprod
            AND c.codemp = 2        )`;

    sqlPainel = `SELECT 

    (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 791) || '|' || 
    (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 34430) || '|' ||
    'UN'           || '|' || 
    PAR.CGC_CPF    || '|' || 
    RPV.CODVEND || '|' || 
    VEN.APELIDO  || '|' || 
    '' || '|' || 
    VEN.EMAIL  || '|' || 
    '' || '|' || 
    '28' || '|' || 
    'NADSON FILHO' || '|' || 
    '' || '|' || 
    'nadson.filho@melodiapet.com.br' || '|' || 
    '' || '|' || 
    '' || '|' || 
    '' || '|' || 
    '' || '|' || 
    '' || '|' ||
    '' 
        AS DADOS
        FROM 

        TGFPAR PAR, 
        TGFRPV RPV,
        TGFVEN VEN 

        WHERE 
        RPV.CODVEND = VEN.CODVEND AND 
        PAR.CODPARC = RPV.CODPARC AND 
        PAR.ATIVO = 'S' AND
        VEN.CODEMP = 2 AND 
        VEN.CODVEND NOT IN(59,61) AND
        VEN.ATIVO = 'S' AND
        PAR.CODPARC <> 0`;    
        
        
sellout(dataInicial, dataFinal){
           
            console.log(dataInicial +' '+dataFinal)
 
    var dados = `SELECT 
                CNPJ_FILIAL_DISTRIBUIDOR|| '|' ||
            CNPJ_INDUSTRIA|| '|' ||
            DATA_NOTA_FISCAL|| '|' ||
            NUMERO_NOTA_FISCAL|| '|' ||
            CHAVE_NFE|| '|' ||
            EAN|| '|' ||
            COD_INTERNO|| '|' ||
            NOME_PRODUTO|| '|' ||
            UNIDADE_VENDA|| '|' ||
            FATOR_PARA_PACOTE|| '|' ||
            TIPO_DOCUMENTO|| '|' ||
            TIPO_ENVIO|| '|' ||
            ltrim(to_char(SUM(VENDAVALORBRUTO), '9999999D99', 'NLS_NUMERIC_CHARACTERS='',.'''))|| '|' ||
            ltrim(to_char(SUM(VENDAVALORLIQUIDA), '9999999D99', 'NLS_NUMERIC_CHARACTERS='',.'''))|| '|' ||
            ltrim(to_char(SUM(VENDAUNIDADES), '9999999D99', 'NLS_NUMERIC_CHARACTERS='',.'''))|| '|' ||
            PRECO_SKU_NF|| '|' ||
            CANAL_VENDA|| '|' ||
            COD_VENDEDOR_HIERARQUIA|| '|' ||
            COD_FISCAL_VENDEDOR|| '|' ||
            CNPJ_PDV|| '|' ||
            FORMATO_PDV|| '|' ||
            RAZAO_SOCIAL|| '|' ||
            UF|| '|' ||
            MUNICIPIO|| '|' ||
            CEP|| '|' ||
            ENDERECO|| '|' ||
            NUMERO as dados

            FROM

            (SELECT

                (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 791) AS CNPJ_Filial_Distribuidor,
                (SELECT TGFPAR.CGC_CPF FROM TGFPAR WHERE TGFPAR.CODPARC = 34430) AS CNPJ_Industria,
                to_char(CAB.DTFATUR, 'YYYYMMDD') AS Data_Nota_Fiscal,
                CAB.NUMNOTA AS Numero_Nota_Fiscal,
                '' AS Chave_NFE,
                PRO.REFERENCIA AS EAN, 
                PRO.CODPROD  AS Cod_interno,
                PRO.DESCRPROD  AS Nome_Produto,
                PRO.CODVOL  AS Unidade_Venda,
                1 AS Fator_Para_Pacote,
                CASE WHEN TPO.TIPMOV = 'V' AND TPO.deScroper NOT like'%BONI%'THEN 'F' WHEN TPO.TIPMOV = 'V' AND TPO.deScroper like'%BONI%' THEN 'B' WHEN TPO.TIPMOV = 'D' AND TPO.deScroper NOT like'%BONI%' THEN 'D' WHEN TPO.TIPMOV = 'D' AND TPO.deScroper like'%BONI%' THEN 'BD' ELSE TPO.TIPMOV END AS Tipo_Documento,  
                ITE.USOPROD AS Tipo_Envio,  
                (ITE.QTDNEG*ITE.VLRUNIT) + ITE.VLRIPI + ITE.VLRSUBST - ITE.VLRDESC - ITE.VLRREPRED AS VendaValorBruto,
                (ITE.QTDNEG*ITE.VLRUNIT) - ITE.VLRDESC + ITE.VLRREPRED  AS VendaValorLiquida,
                ITE.QTDNEG AS VendaUnidades, 
                ltrim(to_char(ITE.VLRUNIT,'9999999D99', 'NLS_NUMERIC_CHARACTERS='',.'''))  AS Preco_Sku_NF,
                CASE WHEN VEN.TIPVEND = 'E' THEN '2' ELSE '1' END AS Canal_Venda,     
                VEN.CODVEND  AS Cod_Vendedor_Hierarquia,
                ''  AS Cod_Fiscal_Vendedor,
                PAR.CGC_CPF  AS CNPJ_PDV,
                'Tradicional'  AS Formato_PDV,
                PAR.RAZAOSOCIAL  AS Razao_Social,
                UF.UF AS UF,
                CID.NOMECID AS Municipio, 
                PAR.CEP AS CEP,
                ENDR.NOMEEND  AS Endereco, 
                PAR.NUMEND AS Numero

            FROM

              TGFCAB CAB
            , TGFPAR PAR
            , TGFITE ITE
            , TGFPRO PRO
            , TGFTOP TPO
            , TGFVEN VEN
            , TSICID CID
            , TSIUFS UF
            , TSIEND ENDR

            WHERE
                    CAB.CODPARC = PAR.CODPARC
                AND CAB.NUNOTA = ITE.NUNOTA
                AND ITE.CODPROD = PRO.CODPROD
                AND CAB.CODTIPOPER = TPO.CODTIPOPER
                AND CAB.DHTIPOPER = TPO.DHALTER
                AND CAB.CODVEND = VEN.CODVEND
                AND PRO.USOPROD <> 'D'
                and CID.CODCID = PAR.CODCID
                and UF.CODUF = CID.UF
                and ENDR.CODEND = PAR.CODEND
                and pro.marca = 'CAFUNE'
                AND  TO_CHAR(TRUNC(CAB.DTFATUR),'yyyyMMdd') >= TO_CHAR(TRUNC(SYSDATE-50),'yyyyMMdd')
                AND  TO_CHAR(TRUNC(CAB.DTFATUR),'yyyyMMdd') <= TO_CHAR(TRUNC(SYSDATE),'yyyyMMdd')
                AND CAB.TIPMOV IN ('V','D')
                AND CAB.STATUSNOTA = 'L'    
                AND pro.codgrupoprod <= 5999999
                AND CAB.CODEMP = 2   
                AND CAB.CODTIPOPER NOT IN (701,702,705,708,710,711,712,717) 
                Group by 
                to_char(CAB.DTFATUR, 'YYYYMMDD'),
                CAB.NUMNOTA,
                --'' || '|' || 
                PRO.REFERENCIA,
                PRO.CODPROD,
                PRO.DESCRPROD,
                PRO.CODVOL,
                
                CASE WHEN TPO.TIPMOV = 'V' AND TPO.deScroper NOT like'%BONI%'THEN 'F' WHEN TPO.TIPMOV = 'V' AND TPO.deScroper like'%BONI%' THEN 'B' WHEN TPO.TIPMOV = 'D' AND TPO.deScroper NOT like'%BONI%' THEN 'D' WHEN TPO.TIPMOV = 'D' AND TPO.deScroper like'%BONI%' THEN 'BD' ELSE TPO.TIPMOV END,
                ITE.USOPROD,
                (ITE.QTDNEG*ITE.VLRUNIT) + ITE.VLRIPI + ITE.VLRSUBST - ITE.VLRDESC - ITE.VLRREPRED,
                (ITE.QTDNEG*ITE.VLRUNIT) - ITE.VLRDESC + ITE.VLRREPRED,
                (ITE.QTDNEG*ITE.VLRUNIT) - ITE.VLRDESC,
                ITE.QTDNEG,
                ltrim(to_char(ITE.VLRUNIT,'9999999D99', 'NLS_NUMERIC_CHARACTERS='',.''')), 
                CASE WHEN VEN.TIPVEND = 'E' THEN '2' ELSE '1' END,
                VEN.CODVEND,
                --'' || '|' || 
                PAR.CGC_CPF,
                --'Tradicional' || '|' || 
                PAR.RAZAOSOCIAL,
                UF.UF,
                CID.NOMECID,
                PAR.CEP,
                ENDR.NOMEEND,
                PAR.NUMEND, ite.sequencia)

                GROUP BY 

                CNPJ_FILIAL_DISTRIBUIDOR,
                    CNPJ_INDUSTRIA,
                    DATA_NOTA_FISCAL,
                    NUMERO_NOTA_FISCAL,
                    CHAVE_NFE,
                    EAN,
                    COD_INTERNO,
                    NOME_PRODUTO,
                    UNIDADE_VENDA,
                    FATOR_PARA_PACOTE,
                    TIPO_DOCUMENTO,
                    TIPO_ENVIO,
                    PRECO_SKU_NF,
                    CANAL_VENDA,
                    COD_VENDEDOR_HIERARQUIA,
                    COD_FISCAL_VENDEDOR,
                    CNPJ_PDV,
                    FORMATO_PDV,
                    RAZAO_SOCIAL,
                    UF,
                    MUNICIPIO,
                    CEP,
                    ENDERECO,
                    NUMERO`
        
        return dados
}
    config = {

        host: 'integracao.tradefy.com.br',
        port: 20,
        username: 'melodiapet',
        password: 's5FRqv'

    }     
}
module.exports = sqlcafune;