var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Cours = require('../models/cours');



router.get('/all', function (req, res, next) {
    Cours.find()
        .exec(function (err, cours) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - cours 1',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: cours
            });
        });
});

router.get('/getbyid/:coursID', function (req, res, next) {
    Cours.findOne({ _id: req.params.coursID })
        .exec(function (err, cours) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - cours 2',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: cours
            });
        });
});


router.post('/', function (req, res, next) {
    var cours = new Cours({
        titre: req.body.titre,
        lien: req.body.lien,
        description: req.body.description
    });

    cours.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - cours 3',
                error: err
            });
        }

        res.status(201).json({
            message: 'Saved course',
            obj: result
        });
    });
});


router.delete('/:coursID', function (req, res, next) {
    Cours.findById(req.params.coursID, function (err, cours) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - cours 4',
                error: err
            });
        }
        if (!cours) {
            return res.status(500).json({
                title: 'No cours Found!',
                error: { message: 'Cours not found' }
            });
        }

        cours.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - cours 5',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted course',
                obj: result
            });
        });
    });
});


router.patch('/updatecours', function (req, res, next) {
    Cours.findOne({ _id: req.body.coursID }, function (err, cours) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - cours 6',
                error: err
            });
        }
        if (!cours) {
            return res.status(500).json({
                title: 'No cours Found!',
                error: { message: 'cours not found' }
            });
        }

        cours.titre = req.body.titre;
        cours.description = req.body.description;
        cours.lien = req.body.lien;

        cours.chapitres = [];

        req.body.chapitres.map(chapitre => {
            //On prepare les sous chapitres
            let sousChapitresArray = [];
            chapitre.sousChapitres.map(sousChapitres => {
                sousChapitresArray.push(new Object({ titre: sousChapitres.titre, texte: sousChapitres.texte, video: sousChapitres.video, numero: sousChapitres.numero, duree: sousChapitres.duree }));
            });

            //On push le chapitre
            cours.chapitres.push(new Object({ titre: chapitre.titre, numero: chapitre.numero, description: chapitre.description, sousChapitres: sousChapitresArray }))

        })

        cours.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - cours 7',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated cours',
                obj: result
            });
        });
    });
});


module.exports = router;