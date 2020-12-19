require('./config/config.js')

const express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.json('Get usuario')
})

app.post('/usuario', function(req, res) {

    let body = req.body;

    console.log(body)
    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        })

    } else {
        res.status(201).json({ persona: body })
    }
})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    })
})


app.delete('/usuario', function(req, res) {
    res.json('delete usuario')
})


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`)
})