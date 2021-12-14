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
/*
	// Select all rows from example table
        let [rows, fields] = await connection.query("SELECT * FROM example");
        console.log(rows);

	// insert data
        let data = {
            name: "sample0",
        };

	// insert data into example table
        let [results] = await connection.query(
            "INSERT INTO example SET ?",
            data
        );
        // inserted data's id(auto_increment)
        let insertId = results.insertId;

	// Select all rows from example table
        [rows, fields] = await connection.query("SELECT * FROM example");
        console.log(rows);

	// update row
        [results] = await connection.query("UPDATE example SET name=? WHERE id=?", [
            "updated_sample",
            insertId,
        ]);

	// Select all rows from example table
        [rows, fields] = await connection.query("SELECT * FROM example");
        console.log(rows);

	// delete row
        [results] = await connection.query("DELETE FROM example WHERE id=?", [
            insertId,
        ]);

	// Select all rows from example table
        [rows, fields] = await connection.query("SELECT * FROM example");
        console.log(rows);

        */
    } catch (error) {
        console.log(error);
    }
};

module.exports = db