var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Zapiermatching = require('../models/zapiermatching');

router.get('/all', function (req, res, next) {
    Zapiermatching.find()
        .exec(function (err, zapiermatchings) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - zapiermatchings 1',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: zapiermatchings
            });
        });
});



router.post('/create', function (req, res, next) {
    var zapiermatching = new Zapiermatching({
        zapier_name: req.body.zapier_name,
        product_id: req.body.product_id
    });

    console.log(zapiermatching);
    zapiermatching.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - zapiermatching 2',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved zapiermatching',
            obj: result
        });
    });
});



router.delete('/:zapier_name', function (req, res, next) {
    Zapiermatching.findOne({ zapier_name: req.params.zapier_name }, function (err, zapiermatching) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - zapiermatching 3',
                error: err
            });
        }
        if (!zapiermatching) {
            return res.status(500).json({
                title: 'No zapiermatching Found!',
                error: { message: 'Zapiermatching not found' }
            });
        }

        zapiermatching.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - zapiermatching 4',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted zapiermatching',
                obj: result
            });
        });
    });
});



router.patch('/:zapier_name', function (req, res, next) {
    Zapiermatching.findOne({ zapier_name: req.params.zapier_name }, function (err, zapiermatching) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - zapiermatching 5',
                error: err
            });
        }
        if (!zapiermatching) {
            return res.status(500).json({
                title: 'No zapiermatching Found!',
                error: { message: 'zapiermatching not found' }
            });
        }

        zapiermatching.zapier_name = req.body.zapier_name;
        zapiermatching.product_id = req.body.product_id;
        zapiermatching.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - zapiermatching 6',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated zapiermatching',
                obj: result
            });
        });
    });
});



module.exports = router;