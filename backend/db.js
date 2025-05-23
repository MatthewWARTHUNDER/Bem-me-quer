const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'BemMeQuer_DB',
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar o banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;  
