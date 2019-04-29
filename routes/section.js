var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Section = require('../models/section');

router.get('/allbypositionandwhatfor/:whatFor', function (req, res, next) {
    const whatFor = req.params.whatFor;
    Section.find({whatFor: whatFor})
        .sort({position: 'asc'})
        .exec(function (err, sections) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - section 1',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: sections
            });
        });
});



router.post('/create', function (req, res, next) {
    var section = new Section({
        position: req.body.position,
        sectionName: req.body.sectionName,
        whatFor: req.body.whatFor
    });

    section.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - section 2',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved section',
            obj: result
        });
    });
});



router.delete('/:sectionName', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Section.findOne({sectionName: req.params.sectionName}, function(err, section) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - section 3',
                error: err
            });
        }
        if (!section) {
            return res.status(500).json({
                title: 'No section Found!',
                error: {message: 'Section not found'}
            });
        }

        section.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - section 4',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted section',
                obj: result
            });
        });
    });
});



router.patch('/:sectionName', function (req, res, next) {
    Section.findOne({sectionName: req.params.sectionName},  function (err, section) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - section 5',
                error: err
            });
        }
        if (!section) {
            return res.status(500).json({
                title: 'No Section Found!',
                error: {message: 'Section not found'}
            });
        }

        section.sectionName = req.body.sectionName;
        section.position = req.body.position;
        section.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - section 6',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated section',
                obj: result
            });
        });
    });
});



module.exports = router;