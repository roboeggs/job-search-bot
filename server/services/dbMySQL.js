const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_base',
})

conn.connect((err) => {
    if (err) {
        console.log("unable to connect MySQL!");
        throw err
    }
    console.log("Connected MySQL!");
});

module.exports = conn;