var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

var Section = require('../models/section');
var Coupdecoeur = require('../models/coupdecoeur');

//Config AWS upload images
var aws = require('aws-sdk'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    bodyParser = require('body-parser'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'owNiL5NhkqiOn8QH1zUxpPlhJctU9VC4RQF0yUXj',
    accessKeyId: 'AKIAJ3T7A75CKBVWMFDQ',
    region: 'eu-west-3'
});


var app = express(),
    s3 = new aws.S3();



var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'espacemembresmaltonline/espacemembre',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});


router.get('/name/:coupdecoeurName', function (req, res, next) {
    Coupdecoeur.findOne({ name: req.params.coupdecoeurName })
        .populate('sections')
        .exec(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - coupdecoeur 2',
                    error: err
                });
            }
            // On ajoute l'image
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
});


router.post("/picture", upload.single("uploadFile"), function (req, res) {
    //On met à jour le chemin de l'image dans le produit grace a son ID
    Coupdecoeur.findById(req.body.coupdecoeurID, function (err, coupdecoeur) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred  - coupdecoeur 3',
                error: err
            });
        }
        if (!coupdecoeur) {
            return res.status(500).json({
                title: 'No coupdecoeur Found!',
                error: { message: 'No coupdecoeur Found to update the picture' }
            });
        }
        coupdecoeur.picture = req.file.location;
        coupdecoeur.save();
    })

    res.send(req.file);
});


router.post('/', function (req, res, next) {
    var coupdecoeur = new Coupdecoeur({
        name: req.body.name,
        picture: req.body.picture,
        description: req.body.description,
        video: req.body.video,
        second_title: req.body.second_title,
        link_to_aff: req.body.link_to_aff,
        link_to_noaff: req.body.link_to_noaff
    });

    if (req.body.sections) {
        req.body.sections.map(section => {
            coupdecoeur.sections.push(section.sectionID);
        });
    }


    coupdecoeur.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - coup de coeur 4',
                error: err
            });
        }

        res.status(201).json({
            message: 'Saved coup de coeur',
            obj: result
        });
    });
});

router.get('/', function (req, res, next) {
    Coupdecoeur.find()
        .populate('sections')
        .exec(function (err, coupdecoeurs) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - coupdecoeur 1',
                    error: err
                });
            }
            // On ajoute l'image
            res.status(200).json({
                message: 'Success',
                obj: coupdecoeurs
            });
        });
});


router.delete('/:coupdecoeurName', function (req, res, next) {
    Coupdecoeur.findOne({ name: req.params.coupdecoeurName }, function (err, coupdecoeur) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - coupdecoeur 6',
                error: err
            });
        }
        if (!coupdecoeur) {
            return res.status(500).json({
                title: 'No coupdecoeur Found!',
                error: { message: 'Coupdecoeur not found' }
            });
        }

        coupdecoeur.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - coupdecoeur 7',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Deleted coupdecoeur',
                obj: result
            });
        });
    });
});


router.patch('/:coupdecoeurName', function (req, res, next) {
    let saveSections = [];

console.log(req.body);

    Coupdecoeur.findOne({ name: req.params.coupdecoeurName }, function (err, coupdecoeur) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - coupdecoeur 9',
                error: err
            });
        }
        if (!coupdecoeur) {
            return res.status(500).json({
                title: 'No coupdecoeur Found!',
                error: { message: 'coupdecoeur not found' }
            });
        }

        coupdecoeur.name = req.body.name;
        coupdecoeur.picture = req.body.picture;
        coupdecoeur.description = req.body.description;
        coupdecoeur.video = req.body.video;
        coupdecoeur.second_title = req.body.second_title;
        coupdecoeur.link_to_aff = req.body.link_to_aff;
        coupdecoeur.link_to_noaff = req.body.link_to_noaff;

        coupdecoeur.sections = [];

        if (req.body.sections) {
            req.body.sections.map(section => {
                coupdecoeur.sections.push(section.sectionID);
            });
        }


        coupdecoeur.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - coupdecoeur 10',
                    error: err
                });
            }


            res.status(200).json({
                message: 'Updated coupdecoeur',
                obj: result
            });
        });
    });
});


module.exports = router;