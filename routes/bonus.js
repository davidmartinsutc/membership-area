var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Bonus = require('../models/bonus');



router.get('/', function (req, res, next) {
    Bonus.find()
        .sort({ date: 'desc' })
        .exec(function (err, notification) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - bonus 1',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: notification
            });
        });
});



router.post('/', function (req, res, next) {
    var bonus = new Bonus({
        date: new Date(),
        content: req.body.content
    });

    bonus.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - bonus 2',
                error: err
            });
        }

        res.status(201).json({
            message: 'Saved bonus',
            obj: result
        });
    });
});


router.delete('/:bonusID', function (req, res, next) {
    const bonusID = req.params.bonusID;
    Bonus.findById(bonusID, function(err, bonus) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - bonus 3',
                error: err
            });
        }
        if (!bonus) {
            return res.status(500).json({
                title: 'No Notif Found!',
                error: {message: 'Bonus not found'}
            });
        }

        bonus.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - bonus 4',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted bonus',
                obj: result
            });
        });
    });
});


module.exports = router;