import pkg from 'pg';
const {Client} = pkg;

const conn = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'USERS',
    password: 'Jb6e3Eb^',
    port: 5432,
  });
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected PostgreSQL!");
});

export default conn;