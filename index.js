const express = require("express");
const cors = require("cors")
const mysql = require('mysql2');


const app = express();
const corsOptions = {
    origin: "http://localhost: 8081"
}
const port = 5000;

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "cfb_team_stats",
    password: "Hockey9710"
});


conn.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected")
});

conn.query(
    'select * from totaloffense where team = "Tennessee"',
    function(error, results, fields) {
        console.log(results);
    }
)

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.get("/", (req, res) => {
    res.json({ message: "'welcome  home"});
})
app.listen(port, () => console.log(`Server running on port ${port}`))