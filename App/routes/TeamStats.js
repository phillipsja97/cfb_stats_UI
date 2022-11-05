const express = require('express');
const db = require('../DB/db')
const router = express.Router();

router.get('/', async (req, resolve, next) => {
    try {
        let results = await db.all();
        resolve.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, resolve, next) => {
    try {
        let results = await db.one(req.params.id);
        resolve.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;