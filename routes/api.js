var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var path = require('path');
var unirest = require('unirest');

var async = require('async');
var crypto = require('crypto');
var hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID || 'membre@smaltonline.com',
    pass = process.env.MAILER_PASSWORD || 'Hamrok2010',
    nodemailer = require('nodemailer');


var Product = require('../models/product');
var User = require('../models/user');
var Zapiermatching = require('../models/zapiermatching');

var ObjectId = require('mongodb').ObjectId;






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



router.get('/:userMail/:products', function (req, res, next) {
    //Format des produits = produit1&&produit2

    var userMail = req.params.userMail.trim().toLowerCase();
    var productsIds = req.params.products.split('&&'); //Tableau d'ID de produits
    var nbProducts = productsIds.length;

    console.log(productsIds);
    console.log(nbProducts);

    User.findOne({ email: userMail.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - api',
                error: err
            });
        }
        else {
            if (!user) {
                // On crée l'user et un mdp
                async.waterfall([
                    function (done) {
                        // create the random token
                        crypto.randomBytes(20, function (err, buffer) {
                            var token = buffer.toString('hex');
                            done(err, token);
                        });
                    },
                    function (token, done) {
                        //Create the new user with the random token
                        var newUser = new User({
                            firstName: 'Nouveau',
                            lastName: 'Membre',
                            password: bcrypt.hashSync('default', 10),
                            email: userMail,
                            phone: '',
                            birthDate: Date.now(),
                            lastConnection: Date.now(),
                            lastClickOnNews: Date.now(),
                            proxy: null,
                            reset_password_token: token,
                            reset_password_expires: null,
                            userProducts: [],
                            userTrainings: []
                        });
                        done(err, newUser);
                    }, function (newUser, done) {
                        //Add the products
                        Product.find({
                            '_id': {
                                $in: productsIds
                            }
                        }, function (err, products) {
                            if (err) {
                                return done(err);
                            }
                            else {
                                let mapCount = 0;
                                products.map(product => {
                                    mapCount += 1;
                                    if (product.whatFor == 'trainings') newUser.userTrainings.push(product._id);
                                    else if (product.whatFor == 'produits') newUser.userProducts.push(product._id);
                                    if (mapCount == nbProducts) done(err, newUser);
                                })
                            }
                        });
                    }, function (newUser, done) {
                        newUser.save(function (err, result) {
                            if (err) {
                                return done(err);
                            }
                            else done(err, newUser);
                        })
                    },
                    function (newUser, done) {
                        //Send the email with account creation
                        var data = {
                            to: newUser.email,
                            from: '"Espace Membre Smalt Online 👻" <membre@smaltonline.com>',
                            template: 'new-member-email',
                            subject: 'Bienvenue dans votre Espace Membre Smalt',
                            context: {
                                url: 'https://www.membre.smaltonline.com/welcome?token=' + newUser.reset_password_token + '&email=' + newUser.email,
                                name: newUser.firstName
                            }
                        };
                        smtpTransport.sendMail(data, function (err) {
                            if (!err) {
                                return res.json({ message: 'Un email vous a été envoyé', user: newUser });
                            } else {
                                return done(err);
                            }
                        });
                    }
                ], function (err) {
                    return res.status(422).json({ message: err });
                });
            }
            else {
                console.log('block user exist')
                //On lui affecte directement les produits
                async.waterfall([
                    function (done) {
                        //Add the products
                        Product.find({
                            '_id': {
                                $in: productsIds
                            }
                        }, function (err, products) {
                            if (err) {
                                return done(err);
                            }
                            else {
                                let mapCount = 0;
                                products.map(product => {
                                    mapCount += 1;
                                    if (product.whatFor == 'trainings') user.userTrainings.push(product._id);
                                    else if (product.whatFor == 'produits') user.userProducts.push(product._id);
                                    if (mapCount == nbProducts) done(err, user);
                                })
                            }
                        });


                    }, function (user, done) {
                        user.save(function (err, result) {
                            if (err) {
                                return done(err);
                            } else {
                                done(err, user);
                            }
                        })
                    },
                    function (user, done) {
                        //Send the email with account creation
                        var data = {
                            to: user.email,
                            from: '"Nouveau Produit dans votre Espace Membre Smalt 👻" <membre@smaltonline.com>',
                            template: 'new-product-email',
                            subject: 'Nouveau Produit dans votre Espace Membre Smalt 👻',
                            context: {
                                url: 'https://www.membre.smaltonline.com',
                                name: user.firstName
                            }
                        };
                        smtpTransport.sendMail(data, function (err) {
                            if (!err) {
                                return res.json({ message: 'Un email vous à été envoyé', user: user });
                            } else {
                                return done(err);
                            }
                        });
                    }
                ], function (err) {
                    console.log('block error 2')
                    return res.status(422).json({ message: err });
                });
            }
        }
    })
});


router.get('/forgotpassword/:email', function (req, res, next) {
    var useremail = req.params.email.trim().toLowerCase();
    async.waterfall([
        function (done) {
            User.findOne({
                email: useremail
            }).exec(function (err, user) {
                if (user) {
                    done(err, user);
                } else {
                    return res.status(401).json({
                        title: "Erreur d'email",
                        error: { message: "Cet email n'est pas dans notre Base de données" }
                    });
                }
            });
        },
        function (user, done) {
            // create the random token
            crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');
                done(err, user, token);
            });
        },
        function (user, token, done) {
            User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function (err, new_user) {
                done(err, token, new_user);
            });
        },
        function (token, user, done) {
            var data = {
                to: user.email,
                from: '"Espace Membre Smalt Online 👻" <membre@smaltonline.com>',
                template: 'forgot-password-email',
                subject: 'Réinitialisation du mot de passe - Espace Membre Smalt',
                context: {
                    url: 'https://www.membre.smaltonline.com/resetpassword?token=' + token,
                    name: user.firstName
                }
            };

            smtpTransport.sendMail(data, function (err) {
                if (!err) {
                    return res.json({ message: 'Un email vous à été envoyé' });
                } else {
                    return done(err);
                }
            });
        }
    ], function (err) {
        return res.status(422).json({ message: err });
    });
});




//Accès membre pour un produit offert

router.post('/free/:products', function (req, res, next) {
    //Format des produits = produit1&&produit2

    console.log('reached');
    console.log(req.body);


    var userMail = req.body.EMAIL.trim().toLowerCase();
    var userPrenom = req.body.FNAME.trim();
    var redirection = req.body.redirection;
    var productsIds = req.params.products.split('&&'); //Tableau d'ID de produits
    var nbProducts = productsIds.length;

    console.log(productsIds);
    console.log(nbProducts);

    User.findOne({ email: userMail.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - api',
                error: err
            });
        }
        else {
            if (!user) {
                // On crée l'user et un mdp
                async.waterfall([
                    function (done) {
                        // create the random token
                        crypto.randomBytes(20, function (err, buffer) {
                            var token = buffer.toString('hex');
                            done(err, token);
                        });
                    },
                    function (token, done) {
                        //Create the new user with the random token
                        var newUser = new User({
                            firstName: userPrenom,
                            lastName: 'Nouveau Membre',
                            password: bcrypt.hashSync('default', 10),
                            email: userMail,
                            phone: '',
                            birthDate: Date.now(),
                            lastConnection: Date.now(),
                            lastClickOnNews: Date.now(),
                            proxy: null,
                            reset_password_token: token,
                            reset_password_expires: null,
                            userProducts: [],
                            userTrainings: []
                        });
                        done(err, newUser);
                    }, function (newUser, done) {
                        //Add the products
                        Product.find({
                            '_id': {
                                $in: productsIds
                            }
                        }, function (err, products) {
                            if (err) {
                                return done(err);
                            }
                            else {
                                let mapCount = 0;
                                products.map(product => {
                                    mapCount += 1;
                                    if (product.whatFor == 'trainings') newUser.userTrainings.push(product._id);
                                    else if (product.whatFor == 'produits') newUser.userProducts.push(product._id);
                                    if (mapCount == nbProducts) done(err, newUser);
                                })
                            }
                        });
                    }, function (newUser, done) {
                        newUser.save(function (err, result) {
                            if (err) {
                                return done(err);
                            }
                            else {
                                addToGetResponseFromLandingPage(newUser);
                                done(err, newUser);
                            }
                        })
                    },
                    function (newUser, done) {
                        //Send the email with account creation
                        var data = {
                            to: newUser.email,
                            from: '"Espace Membre Smalt Online" <membre@smaltonline.com>',
                            template: 'new-member-free-email',
                            subject: '🔥 Bienvenue dans votre Espace Membre Smalt',
                            context: {
                                url: 'https://www.membre.smaltonline.com/welcome?token=' + newUser.reset_password_token + '&email=' + newUser.email,
                                name: userPrenom
                            }
                        };
                        smtpTransport.sendMail(data, function (err) {
                            /*if (!err) {
                                return res.json({ message: 'Un email vous à été envoyé', user: newUser });
                            } else {
                                return done(err);
                            }*/
                            res.redirect(redirection);
                        });
                    }
                ], function (err) {
                    return res.status(422).json({ message: err });
                });
            }
            else {
                console.log('block user exist')
                //On lui affecte directement les produits
                async.waterfall([
                    function (done) {
                        //Add the products
                        Product.find({
                            '_id': {
                                $in: productsIds
                            }
                        }, function (err, products) {
                            if (err) {
                                return done(err);
                            }
                            else {
                                let mapCount = 0;
                                products.map(product => {
                                    mapCount += 1;
                                    if (product.whatFor == 'trainings') {
                                        if (user.userTrainings.indexOf(product._id) == -1) user.userTrainings.push(product._id);
                                    }
                                    else if (product.whatFor == 'produits') {
                                        if (user.userProducts.indexOf(product._id) == -1) user.userProducts.push(product._id);
                                    }
                                    if (mapCount == nbProducts) done(err, user);
                                })
                            }
                        });


                    }, function (user, done) {
                        user.save(function (err, result) {
                            if (err) {
                                return done(err);
                            } else {
                                done(err, user);
                            }
                        })
                    },
                    function (user, done) {
                        //Send the email with account creation
                        var data = {
                            to: user.email,
                            from: '"Espace Membre Smalt Online" <membre@smaltonline.com>',
                            template: 'new-product-free-email',
                            subject: '🔥 Nouveau Produit dans votre Espace Membre Smalt',
                            context: {
                                url: 'https://www.membre.smaltonline.com/',
                                name: user.firstName
                            }
                        };
                        smtpTransport.sendMail(data, function (err) {
                            /*if (!err) {
                                return res.json({ message: 'Un email vous à été envoyé', user: user });
                            } else {
                                return done(err);
                            }*/
                            res.redirect(redirection);
                        });
                    }
                ], function (err) {
                    console.log('block error 2')
                    return res.status(422).json({ message: err });
                });
            }
        }
    })

});

router.post('/paid', function (req, res, next) {
    //Format des produits = produit1&&produit2

    console.log(req.body);


    var userMail = req.body.email.trim().toLowerCase();
    var userPrenom = req.body.firstname.trim();
    if (req.body.product) var titre = req.body.product.trim()
    else var titre = req.body.amount.trim();
    var ProductObjectsList = [];
    var amount = req.body.amount.trim();


    //Rechercher produits d'après le titre envoyé
    Zapiermatching.findOne({ zapier_name: titre }, function (err, productList) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred - api',
                error: err
            });
        }

        var productsIds = productList.product_id.split('&&'); //Tableau d'ID de produits
        var nbProducts = productsIds.length;

        console.log(productsIds);

        User.findOne({ email: userMail.trim().toLowerCase() }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - api',
                    error: err
                });
            }
            else {
                if (!user) {
                    // On crée l'user et un mdp
                    async.waterfall([
                        function (done) {
                            // create the random token
                            crypto.randomBytes(20, function (err, buffer) {
                                var token = buffer.toString('hex');
                                done(err, token);
                            });
                        },
                        function (token, done) {
                            //Create the new user with the random token
                            var newUser = new User({
                                firstName: userPrenom,
                                lastName: 'Nouveau Membre',
                                password: bcrypt.hashSync('default', 10),
                                email: userMail,
                                phone: '',
                                birthDate: Date.now(),
                                lastConnection: Date.now(),
                                lastClickOnNews: Date.now(),
                                proxy: null,
                                reset_password_token: token,
                                reset_password_expires: null,
                                userProducts: [],
                                userTrainings: []
                            });
                            done(err, newUser);
                        }, function (newUser, done) {
                            //Add the products
                            Product.find({
                                '_id': {
                                    $in: productsIds
                                }
                            }, function (err, products) {
                                if (err) {
                                    return done(err);
                                }
                                else {
                                    let mapCount = 0;
                                    products.map(product => {
                                        ProductObjectsList.push(product);
                                        mapCount += 1;
                                        if (product.whatFor == 'trainings') {
                                            newUser.userTrainings.push(product._id);
                                            if (product.offered_trainings.length > 0) {
                                                product.offered_trainings.map(training => {
                                                    newUser.userTrainings.push(training)
                                                })
                                            }
                                        }
                                        else if (product.whatFor == 'produits') {
                                            newUser.userProducts.push(product._id);
                                            if (product.offered_trainings.length > 0) {
                                                product.offered_trainings.map(training => {
                                                    newUser.userTrainings.push(training)
                                                })
                                            }
                                        }
                                        if (mapCount == nbProducts) done(err, newUser);
                                    })
                                }
                            });
                        }, function (newUser, done) {
                            newUser.save(function (err, result) {
                                if (err) {
                                    return done(err);
                                }
                                else {
                                    addToGetResponseFromLandingPage(newUser);
                                    done(err, newUser);
                                }
                            })
                        },
                        function (newUser, done) {
                            try {
                                sendInvoiceEmail(newUser, amount, ProductObjectsList);
                            } catch (err) {
                                console.log(err);
                            }

                            //Send the email with account creation
                            var data = {
                                to: newUser.email,
                                from: '"Espace Membre Smalt Online" <membre@smaltonline.com>',
                                template: 'new-member-paid-email',
                                subject: '🔥 Bienvenue dans votre Espace Membre Smalt',
                                context: {
                                    url: 'https://www.membre.smaltonline.com/welcome?token=' + newUser.reset_password_token + '&email=' + newUser.email,
                                    name: userPrenom
                                }
                            };
                            smtpTransport.sendMail(data, function (err) {
                                if (!err) {
                                    return res.json({ message: 'Un email vous à été envoyé', user: newUser });
                                } else {
                                    return done(err);
                                }
                            });
                        }
                    ], function (err) {
                        return res.status(422).json({ message: err });
                    });
                }
                else {
                    console.log('block user exist')
                    //On lui affecte directement les produits
                    async.waterfall([
                        function (done) {
                            //Add the products
                            Product.find({
                                '_id': {
                                    $in: productsIds
                                }
                            }, function (err, products) {
                                if (err) {
                                    return done(err);
                                }
                                else {
                                    let mapCount = 0;
                                    products.map(product => {
                                        mapCount += 1;
                                        ProductObjectsList.push(product);
                                        if (product.whatFor == 'trainings') {
                                            if (user.userTrainings.indexOf(product._id) == -1) {
                                                user.userTrainings.push(product._id);
                                                if (product.offered_trainings.length > 0) {
                                                    product.offered_trainings.map(training => {
                                                        user.userTrainings.push(training)
                                                    })
                                                }
                                            }
                                        }
                                        else if (product.whatFor == 'produits') {
                                            if (user.userProducts.indexOf(product._id) == -1) {
                                                user.userProducts.push(product._id);
                                                if (product.offered_trainings.length > 0) {
                                                    product.offered_trainings.map(training => {
                                                        user.userTrainings.push(training)
                                                    })
                                                }
                                            }
                                        }
                                        if (mapCount == nbProducts) done(err, user);
                                    })
                                }
                            });


                        }, function (user, done) {
                            user.save(function (err, result) {
                                if (err) {
                                    return done(err);
                                } else {
                                    done(err, user);
                                }
                            })
                        },
                        function (user, done) {
                            try {
                                sendInvoiceEmail(user, amount, ProductObjectsList);
                            } catch (err) {
                                console.log(err);
                            }
                            //Send the email with account creation
                            var data = {
                                to: user.email,
                                from: '"Espace Membre Smalt Online" <membre@smaltonline.com>',
                                template: 'new-product-paid-email',
                                subject: '🔥 Nouveau Produit dans votre Espace Membre Smalt',
                                context: {
                                    url: 'https://www.membre.smaltonline.com/',
                                    name: user.firstName
                                }
                            };
                            smtpTransport.sendMail(data, function (err) {
                                if (!err) {
                                    return res.json({ message: 'Un email vous à été envoyé', user: user });
                                } else {
                                    return done(err);
                                }
                            });
                        }
                    ], function (err) {
                        console.log('block error 2')
                        return res.status(422).json({ message: err });
                    });
                }
            }
        })
    });
});


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


function addToGetResponseFromLandingPage(user) {
    var fields = JSON.stringify(new Object({
        name: user.firstName,
        email: user.email,
        campaign: {
            campaignId: "6ps0O"
        }
    }));

    addToGetResponse(fields);
}


//GetResponse apikey
var apikey = 'api-key f98789b2bc5cf810b95710398add5e3a';

function addToGetResponse(fields) {
    unirest.post('https://api.getresponse.com/v3/contacts')
        .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Auth-Token': apikey })
        .send(fields)
        .end(function (response) {
            console.log(response.body);
        });
}


module.exports = router;
