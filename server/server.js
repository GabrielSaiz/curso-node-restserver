require('./config/config.js')


const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario.js'))


const conectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(process.env.URLDB, conectionOptions,
    (err, res) => {

        if (err) throw err;

        console.log('Conexion a Base de datos establecida');

    })


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`)
})