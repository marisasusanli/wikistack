const express = require ('express')
const app = express()
const morgan = require('morgan')
const layout = require('./views/layout.js')
app.use(morgan('dev'))
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res, send) => res.send(layout('')))
const port = 3000

app.listen(port, () => console.log('port is working'))