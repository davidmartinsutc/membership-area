var express = require('express');
var stripe = require('stripe')('sk_live_UmDvH3MqoSWmvNFU2roiNvUm');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Commande = require('../models/commande');
var path = require('path');

var async = require('async');
var crypto = require('crypto');
var hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID || 'membre@smaltonline.com',
    pass = process.env.MAILER_PASSWORD || 'Hamrok2010',
    nodemailer = require('nodemailer');


//Initialisation de l'envoi de mails
var smtpTransport = nodemailer.createTransport({
    host: 'SSL0.OVH.NET',
    port: 465,
    secure: true,
    //service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
});

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./routes/mail_templates/'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));
// Fin initialisation


//Fonctions d'envoi d'email
function sendInvoiceEmail(user, total, products) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;

    var data = {
        to: user.email,
        from: '"Espace Membre Smalt Online" <membre@smaltonline.com>',
        template: 'invoice-email',
        subject: '🔥 Merci de votre confiance',
        context: {
            name: user.firstName,
            email: user.email,
            date: today,
            produits: products,
            total: total
        }
    };
    smtpTransport.sendMail(data);
};


function sendToAdminNotif(user, total, products) {
    var commande = new Commande({
        user: user,
        products: products,
        date: new Date(),
        traite: false
    })
    commande.save();
};


function sendToAdminEmail(user, total, products) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;

    var data = {
        to: 'commande@smaltonline.com',
        from: '"Espace Membre Smalt Online" <membre@smaltonline.com>',
        template: 'commande-email',
        subject: 'Nouvelle commande',
        context: {
            name: user.firstName,
            email: user.email,
            date: today,
            produits: products,
            total: total
        }
    };
    smtpTransport.sendMail(data);
};


router.get('/allbypositionandwhatfor/:whatFor', function (req, res, next) {
    const whatFor = req.params.whatFor;
    Section.find({ whatFor: whatFor })
        .sort({ position: 'asc' })
        .exec(function (err, sections) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - checkout 1',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: sections
            });
        });
});


router.post('/pay/:userID', function (req, res, next) {

    const userID = req.params.userID;
    var ProductList = [];
    var ProductObjectsList = [];

    User.findOne({ _id: userID })
        .populate('panier')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - checkout 2',
                    error: err,
                    validate: false
                });
            }

            var totalPanier = 0;
            user.panier.map(produit => {
                ProductList.push(produit.name);
                ProductObjectsList.push(produit);
                totalPanier += produit.price;
            })
            totalPanier = Math.round(totalPanier * 100);

            if (totalPanier > 0) {

                stripe.customers.create({
                    email: user.email.trim().toLowerCase(),
                    source: req.body.stripeToken
                }, function (err, customer) {
                    if (err) {
                        return res.status(500).json({
                            title: 'Erreur',
                            error: err,
                            validate: false
                        });
                    }
                    else {
                        stripe.charges.create({
                            amount: totalPanier,
                            currency: "eur",
                            description: "Achat depuis l'espace membre",
                            customer: customer.id
                        }, function (err, charge) {
                            if (err) {
                                return res.status(500).json({
                                    title: 'Erreur',
                                    error: err,
                                    validate: false
                                });
                            }
                            else {
                                sendInvoiceEmail(user, totalPanier / 100, ProductObjectsList);
                                sendToAdminNotif(user, totalPanier / 100, ProductObjectsList);
                                sendToAdminEmail(user, totalPanier/100, ProductObjectsList);
                                res.status(200).json({
                                    message: 'Success',
                                    obj: 'Payment OK',
                                    validate: true
                                })
                            }
                        })
                    }
                });
            }
            else {
                return res.status(500).json({
                    title: 'Erreur montant panier',
                    error: 'Erreur montant panier',
                    validate: false
                });
            }
        })
});


module.exports = router;