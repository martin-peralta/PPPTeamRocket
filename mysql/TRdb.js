import mysql from 'mysql2/promise';


const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TRdb'
}

const connection = mysql.createConnection(config);

connection.query('SELECT ...', (err, rows) => {
  // futuro código
}