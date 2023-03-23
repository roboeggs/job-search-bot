import pkg from 'pg';
const {Client} = pkg;

const conn = new Client({
    user: 'postgres',
    host: 'localhost',
    database: process.env.TABLE_SQL,
    password: process.env.PASSWORD_SQL,
    port: 5432,
  });
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected PostgreSQL!");
});

export default conn;