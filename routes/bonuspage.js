var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var BonusPage = require('../models/bonuspage');



router.get('/all', function (req, res, next) {
    BonusPage.find()
        .exec(function (err, bonusPage) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - bonuspage 1',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: bonusPage
            });
        });
});

router.get('/getbyid/:bonusPageID', function (req, res, next) {
    BonusPage.findOne({ _id: req.params.bonusPageID })
        .exec(function (err, bonusPage) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - bonuspage 2',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: bonusPage
            });
        });
});


router.post('/', function (req, res, next) {
    var bonusPage = new BonusPage({
        titre: req.body.titre,
        description: req.body.description
    });

    bonusPage.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - bonusPage 3',
                error: err
            });
        }

        res.status(201).json({
            message: 'Saved bonusPage',
            obj: result
        });
    });
});


router.delete('/:bonusPageID', function (req, res, next) {
    BonusPage.findById(req.params.bonusPageID, function (err, bonusPage) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - bonusPage 4',
                error: err
            });
        }
        if (!bonusPage) {
            return res.status(500).json({
                title: 'No bonusPage Found!',
                error: { message: 'bonusPage not found' }
            });
        }

        bonusPage.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - bonusPage 5',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted bonusPage',
                obj: result
            });
        });
    });
});


router.patch('/update', function (req, res, next) {
    BonusPage.findOne({ _id: req.body.bonusPageID }, function (err, bonusPage) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - bonusPage 6',
                error: err
            });
        }
        if (!bonusPage) {
            return res.status(500).json({
                title: 'No bonusPage Found!',
                error: { message: 'bonusPage not found' }
            });
        }

        bonusPage.titre = req.body.titre;
        bonusPage.description = req.body.description;

        bonusPage.bonus = [];

        req.body.bonus.map(bonus => {
            //On push le chapitre
            bonusPage.bonus.push(new Object({ titre: bonus.titre, image: bonus.image, description: bonus.description, downloadLink: bonus.downloadLink }))
        })

        bonusPage.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - bonusPage 7',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated bonusPage',
                obj: result
            });
        });
    });
});


module.exports = router;