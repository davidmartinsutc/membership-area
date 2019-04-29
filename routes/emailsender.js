var express = require('express');
var router = express.Router();
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
function sendEmail(user_email, firstName, message) {

    var data = {
        to: 'membre@smaltonline.com',
        from: user_email,
        template: 'contact-email',
        subject: 'Nouveau Message',
        context: {
            name: firstName,
            email: user_email,
            message: message
        }
    };
    smtpTransport.sendMail(data);
};

router.post('/', function (req, res, next) {
    sendEmail(req.body.sender, req.body.firstName, req.body.message);
});


module.exports = router;