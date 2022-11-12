const express = require("express");
const cors = require("cors")
const offenseRoutes = require('./routes/offenseRoutes');
const db = require('./DB/db');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use('/api/offense', offenseRoutes);

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server running on port ${port}`));