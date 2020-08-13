const express = require('express')
const router = express.Router()
const addPage = require('../views/addPage')

router.get('/', (req, res, send) => res.send('test1'));
router.post('/', (req, res, send) => res.send('test1'));
router.get('/add', (req, res, send) => res.send(addPage()));
module.exports = router