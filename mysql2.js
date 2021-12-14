// mysql2.js

const mysql = require("mysql2/promise");

const db = async (type, sql, values) => {
    try {
    	// db connection
        let result = {};
        let connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: 'qwer^^1234',
            database : 'ssu'
        });

        const [rows] = await connection.query(sql, values);
        if(type == 's') result.rows = rows;
        return result

    } catch (error) {
        console.log(error);
    }
};

module.exports = db