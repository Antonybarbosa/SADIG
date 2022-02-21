class comando{

    constructor(){
        this.select = 
        `SELECT

        SUBSTR(EMPCAB.CGC,1,14) AS cnpjemitente,
        SUBSTR(EMPCAB.RAZAOSOCIAL,1,50) AS razaoemitente,
        SUBSTR(PAR.CGC_CPF,1,14) AS CNPJ,
        SUBSTR(PAR.RAZAOSOCIAL,1,60) AS nome,
        SUBSTR(ENDPA.NOMEEND,1,50) AS endereco,
        SUBSTR(CIDPAR.NOMECID,1,50) AS municipio,
        SUBSTR(PAR.CEP,1,8) AS cep,
        SUBSTR(UF.UF,1,2) AS estado,
        SUBSTR(PAR.TELEFONE,1,20) AS telefone,
        SUBSTR(TPP.DESCRTIPPARC,1,40) AS nomecategoria1,
        SUBSTR(CASE
                WHEN TPO.DESCROPER = 'VENDA NFE' THEN 'VE-VENDA'
                ELSE 'BO-BONICAÇÃO'
            END,1,15) 
        
        AS descricao_cfop,
        SUBSTR(PRO.REFFORN,1,14) AS referencia,
        SUBSTR(PRO.DESCRPROD,1,50) AS descricao_produto,
        SUBSTR(ITE.QTDNEG * (
            CASE
                WHEN CAB.TIPMOV = 'D' THEN -1
                ELSE 1
            END
        ),1,6) AS quantidade,
        SUBSTR(TO_CHAR(trunc(CAB.DTFATUR),'DD/MM/YYYY'),1,10) AS emissao,
        SUBSTR(CAB.CODVEND,1,20) AS codigovendedor,
        SUBSTR(VEN.APELIDO,1,30) AS nomevendedor,
        SUBSTR(PAR.EMAIL,1,30) AS email, 
        ITE.QTDNEG * (
            CASE
                WHEN CAB.TIPMOV = 'D' THEN -1
                ELSE 1
            END
        )*PRO.PESOLIQ AS PESOLIQ,
        SUBSTR(par.nomeparc,1,40) as nomeparc,
        SUBSTR((SELECT P.RAZAOSOCIAL FROM TGFPAR P WHERE P.CODPARC = case when par.codparcmatriz is null then par.codparc else par.codparcmatriz end),1,40) AS codparcmatriz,
        SUBSTR(cab.numnota,1,20) as numnota,
        SUBSTR(cab.chavenfe,1,50) as chavenfe,
        round(ite.vlrunit,2) as vlrunit
    
    FROM
        TGFCAB CAB,
        TSIEMP EMPCAB,
        TGFPAR PAR,
        TSIEND ENDPA,
        TSICID CIDPAR,
        TSICID CID,
        TSIUFS UF,
        TGFTPP TPP,
        TGFTOP TPO,
        TGFITE ITE,
        TGFPRO PRO,
        TGFVEN VEN
    WHERE
        PAR.CODCID = CIDPAR.CODCID
        AND CAB.CODEMP = EMPCAB.CODEMP
        AND PAR.CODEND = ENDPA.CODEND
        AND ITE.NUNOTA = CAB.NUNOTA
        AND CAB.CODPARC = PAR.CODPARC
        AND CAB.CODVEND = VEN.CODVEND 
        AND CAB.CODTIPOPER = TPO.CODTIPOPER
        AND cab.dhtipoper = tpo.dhalter
        AND CAB.NUNOTA = ITE.NUNOTA
        AND UF.CODUF = CID.UF
        AND PAR.CODCID = CID.CODCID
        AND ITE.CODPROD = PRO.CODPROD
        AND PAR.CODTIPPARC = TPP.CODTIPPARC
        AND  TO_CHAR(TRUNC(CAB.DTFATUR),\'YYYYMMDD\') >= ?
        AND  TO_CHAR(TRUNC(CAB.DTFATUR),\'YYYYMMDD\') <= ?
        AND  TPO.TIPMOV = 'V' 
        AND  CAB.CODEMP = 1 
        AND  CAB.STATUSNOTA = 'L'
        AND  (PRO.CODGRUPOPROD BETWEEN 01000000 
        AND   05999999)
        AND  PRO.MARCA = 'ROYALCANIN' 
        AND  CAB.CODTIPOPER in(700,703,709,707,723,724,725,715)`
    }


      getselect(){
          return this.select
      }  

}

module.exports = comando