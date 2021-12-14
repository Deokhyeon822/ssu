const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password: 'qwer^^1234',
    database : 'ssu'
});



module.exports = connection