// Update with your config settings.

module.exports = {

  
    client: 'oracledb',
    connection: { 
      host: '192.168.0.157:1521',//produção
      //host: '192.168.0.11:1521', //teste
      //host: '201.39.194.10:4131',//embratel
      //host: '179.108.248.88:4131',//bbg
      database: 'SANKHYA',
      user:     'sankhya',
      password: 'tecsis'
      }
    ,
    pool: {
      min: 2,
      max: 10
    },
    //debug: true
    //migrations: {
      ///tableName: 'knex_migrations'
    //}
  

};
