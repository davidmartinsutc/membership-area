var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Notification = require('../models/notification');
var User = require('../models/user');



router.get('/', function (req, res, next) {
    Notification.find()
        .sort({ date: 'desc' })
        .exec(function (err, notification) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - notifications 1',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: notification
            });
        });
});


router.get('/:lastConnection', function (req, res, next) {
    const lastConnection = req.params.lastConnection;
    //A Transforer en Date
    Notification.find()
        .sort({ date: 'desc' })
        .exec(function (err, notification) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - notifications 2',
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
    var notification = new Notification({
        date: new Date(),
        content: req.body.content,
        link: req.body.link,
        favicon: req.body.favicon
    });

    notification.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - notifications 3',
                error: err
            });
        }

        //On ajoute la notif dans les users
        User.update({},{ $push: { userNotifications: result._id }}, {multi: true}, function(err, resultat) {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de push dans les notif des users',
                    error: err
                });
            }
        });

        User.update({ $where: "this.userNotifications.length > 5" }, { $pop: {userNotifications: -1}}, {multi: true}, function(err, resultat) {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de push dans les notif des users',
                    error: err
                });
            }
        });


        res.status(201).json({
            message: 'Saved notification',
            obj: result
        });
    });
});


router.delete('/:notifID', function (req, res, next) {
    const notificationID = req.params.notifID;
    Notification.findById(notificationID, function(err, notification) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - notifications 4',
                error: err
            });
        }
        if (!notification) {
            return res.status(500).json({
                title: 'No Notif Found!',
                error: {message: 'Notification not found'}
            });
        }

        notification.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - notifications 5',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted notif',
                obj: result
            });
        });
    });
});


module.exports = router;