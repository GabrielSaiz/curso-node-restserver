const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario.js')
const app = express()


app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    let filter = { estado: true }

    Usuario.find(filter, 'nombre email role estado google img')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                console.log(err)
                res.status(404).json({
                    ok: false,
                    err
                })
                return
            }

            Usuario.count(filter, (err, conteo) => {


                res.status(200).json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                })
            })
        })
        // res.json('Get usuario')
})

app.post('/usuario', function(req, res) {

    let body = req.body;

    console.log(body)
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                ok: false,
                err
            })
            return
        }

        // usuarioDB.password = null;

        res.status(201).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    console.log(req.body)
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    console.log(body)


    let options = {
        new: true,
        runValidators: true,
        context: 'query'
    };

    Usuario.findByIdAndUpdate(id, body, options, (err, usuarioDB) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                ok: false,
                err
            })
            return
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})


app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let options = {
        new: true,
        context: 'query'
    };


    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    Usuario.findByIdAndUpdate(id, { estado: false }, options, (err, usuarioBorrado) => {

        if (err) {
            console.log(err)
            res.status(404).json({
                ok: false,
                err
            })
            return
        }

        if (usuarioBorrado == null) {
            res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            })
            return
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})


module.exports = app;