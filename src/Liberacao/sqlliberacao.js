class sqlliberacao{
    
    libComercial(){

        const selectComercial = `SELECT
        lib.evento,
        eve.descricao,
        vlrtotal,
        TO_CHAR(lib.dhsolicit, 'dd/mm/yyyy hh24:mi:ss') AS dtsolicitacao,
        TO_CHAR(SYSDATE, 'dd/mm/yyyy hh24:mi:ss') AS data_atual,
        TI_NNPESSOA_TEMPO('','',  SYSDATE - lib.dhsolicit) AS tempo
    FROM
        tsilib      lib,
        vgflibeve   eve
    WHERE
        lib.evento = eve.evento
        AND dhlib IS NULL
        AND lib.dhsolicit >= trunc(SYSDATE, 'MM')`;

        return selectComercial

    }

}

module.export = sqlliberacao;