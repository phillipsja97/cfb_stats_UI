const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.PASSWORD,
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: '3306'
});

let statsDB = {};
statsDB.all = () => {
    return new Promise((res, rej) => {
        pool.query('select * from totaloffense', (err, results) => {
            if (err)  {
                return rej(err);
            }
            return res(results);
        })
    })
};

statsDB.one = (team) => {
    return new Promise((res, rej) => {
        pool.query('select * from totaloffense where team = ?', [team], (err, results) => {
            if (err)  {
                return rej(err);
            }
            return res(results[0]);
        })
    })
}

module.exports = statsDB;