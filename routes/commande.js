var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Commande = require('../models/commande');



router.get('/', function (req, res, next) {
    Commande.find()
        .sort({ traite: 'desc' })
        .populate('products')
        .populate('user')
        .exec(function (err, commande) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - commande 1',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: commande
            });
        });
});




router.patch('/setvalidated', function (req, res, next) {
    var commandeId = req.body.commandeId;

    Commande.findByIdAndUpdate({ _id: commandeId }, { traite: true }).exec(function (err, commande) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - commande 2',
                error: err
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: commande
        });

    });
});


module.exports = router;