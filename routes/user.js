var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var path = require('path');

var async = require('async');
var crypto = require('crypto');
var hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID || 'membre@smaltonline.com',
    pass = process.env.MAILER_PASSWORD || 'Hamrok2010',
    nodemailer = require('nodemailer');


var Product = require('../models/product');
var User = require('../models/user');

var ObjectId = require('mongodb').ObjectId;



router.get('/all', function (req, res, next) {
    User.find()
        .populate('userTrainings')
        .populate('userProducts')
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 1',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: users
            });
        });
});


router.post('/updateConnection', function (req, res, next) {
    if (req.body.email) {
        var query = { email: req.body.email.trim().toLowerCase() };
        var updater = { lastConnection: Date.now() }

        User.findOneAndUpdate(query, updater, (err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 2',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Successfully updated lastConnection',
                obj: result
            });
        });
    }
    else {
        res.status(201).json({
            message: 'Not Successfully updated lastConnection',
            obj: 'Warning : Not Successfully updated lastConnection'
        });
    }
});


router.post('/addProducts', function (req, res, next) {
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 3',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Ajout de produits : Impossible de trouver l'utilisateur" }
            });
        }

        user.userProducts = [];
        req.body.userProducts.map(userProduct => {
            user.userProducts.push(userProduct.productID);
        })
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 4',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Products Updated',
                obj: result
            });
        });
    })
});



router.post('/addProduct/:productID', function (req, res, next) {
    var idProduct = req.params.productID;
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 5',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Ajout d'un produit : Impossible de trouver l'utilisateur" }
            });
        }

        Product.findById(idProduct, function (err, product) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 6',
                    error: err
                });
            }
            if (!product) {
                return res.status(500).json({
                    title: 'No Product Found!',
                    error: { message: 'No Product Found' }
                });
            }

            //On ajoute à l'user
            user.userProducts.push(product._id);

            if (product.offered_trainings.length > 0 ){
                product.offered_trainings.map( training => {
                    user.userTrainings.push(training)
                })
            }

            user.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred - user 7',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Products Updated',
                    obj: result
                });
            });
        })
    })
});

router.post('/addTraining/:productID', function (req, res, next) {
    var idProduct = req.params.productID;
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 8',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Ajout de formation : Impossible de trouver l'utilisateur" }
            });
        }

        Product.findById(idProduct, function (err, product) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 9',
                    error: err
                });
            }
            if (!product) {
                return res.status(500).json({
                    title: 'No Product Found!',
                    error: { message: 'No Product Found' }
                });
            }

            //On ajoute à l'user
            user.userTrainings.push(product._id);
        })

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 10',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Products Updated',
                obj: result
            });
        });
    })
});




router.post('/addTrainings', function (req, res, next) {
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 11',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Ajout de formations : Impossible de trouver l'utilisateur" }
            });
        }

        user.userTrainings = [];
        req.body.userTrainings.map(userTraining => {
            user.userTrainings.push(userTraining.productID);
        })
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 12',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Trainings Updated',
                obj: result
            });
        });
    })
});


router.post('/updateLastClickOnNews', function (req, res, next) {
    var query = { email: req.body.email.trim().toLowerCase() };
    var updater = { lastClickOnNews: Date.now() }

    User.findOneAndUpdate(query, updater, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 13',
                error: err
            });
        }
        res.status(201).json({
            message: 'Successfully updated lastClickOnNews',
            obj: result
        });
    });
});


router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email.trim().toLowerCase(),
        phone: req.body.phone,
        birthDate: req.body.birthDate,
        lastConnection: Date.now(),
        lastClickOnNews: Date.now(),
        proxy: null,
        reset_password_token: '',
        reset_password_expires: null
    });

    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 14',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


router.post('/update', function (req, res, next) {

    var query = { email: req.body.email.trim().toLowerCase() };
    var updater = { firstName: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone, birthDate: req.body.birthDate }
    User.findOneAndUpdate(query, updater, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 15',
                error: err
            });
        }
        res.status(201).json({
            message: 'Successfully updated',
            obj: result
        });
    });
});


router.post('/updatewithpassword/:token', function (req, res, next) {

    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 16',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Erreur de changement de Mot de Passe',
                error: { message: "Veuilez réessayer ou contacter l'équipe Smalt Online" }
            });
        }

        if (user.reset_password_token != req.params.token) {
            return res.status(401).json({
                title: 'Erreur de verification du token',
                error: { message: 'Impossible de changer le mot de passe. Veuillez contacter un administrateur' }
            });
        }
        else {

            var query = { email: req.body.email.trim().toLowerCase() };
            var updater = { password: bcrypt.hashSync(req.body.password, 10), firstName: req.body.firstName, lastName: req.body.lastName }

            User.findOneAndUpdate(query, updater, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred - user 17',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Successfully updated',
                    obj: result
                });
            });

        }
    });
});




router.post('/updatemdp', function (req, res, next) {

    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 18',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Erreur de changement de Mot de Passe',
                error: { message: "Veuilez réessayer ou contacter l'équipe Smalt Online" }
            });
        }
        if (!bcrypt.compareSync(req.body.mdpActuel, user.password)) {
            return res.status(401).json({
                title: 'Password Missmatch',
                error: { message: 'Le Mot de passe actuel ne correspond pas' }
            });
        }
        else {

            var query = { email: req.body.email.trim().toLowerCase() };
            var updater = { password: bcrypt.hashSync(req.body.mdpNew, 10) }
            User.findOneAndUpdate(query, updater, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred - user 19',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Successfully updated',
                    obj: result
                });
            });

        }
    });
});



router.post('/resetmdp/:token', function (req, res, next) {
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 20',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Erreur de changement de Mot de Passe',
                error: { message: "Veuilez réessayer ou contacter l'équipe Smalt Online" }
            });
        }

        if (user.reset_password_token != req.params.token) {
            return res.status(401).json({
                title: 'Erreur de verification du token',
                error: { message: 'Impossible de changer le mot de passe. Veuillez contacter un administrateur' }
            });
        }
        else {

            var query = { email: req.body.email.trim().toLowerCase() };
            var updater = { password: bcrypt.hashSync(req.body.password, 10) }
            User.findOneAndUpdate(query, updater, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred - user 21',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Successfully updated',
                    obj: result
                });
            });

        }
    });
});



router.get('/:userId', function (req, res, next) {
    var userId = req.params.userId;
    var o_userId = new ObjectId(userId);

    User.find({ _id: o_userId })
        .populate({ path: 'userNotifications', options: { sort: { date: 'desc' } } })
        .populate('userTrainings')
        .populate('userProducts')
        .populate('panier')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 22',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'No User',
                    error: { message: 'Invalid User' }
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: user
            });
        });
});


router.post('/signin', function (req, res, next) {
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 23',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Erreur de Connexion',
                error: { message: "Aucun compte associé à cet email" }
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Erreur de Connexion',
                error: { message: 'Mot de passe erroné' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});


router.delete('/:email', function (req, res, next) {
    User.findOne({ email: req.params.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 24',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No User Found!',
                error: { message: 'User not found' }
            });
        }

        user.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 25',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted user',
                obj: result
            });
        });
    });
});


router.post('/addadmin', function (req, res, next) {
    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 26',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Add failed',
                error: { message: 'Invalid add proxy' }
            });
        }

        user.proxy = '3000';
        user.save();

        res.status(200).json({
            message: 'Successfully saved in',
            obj: true
        });
    });
});




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

router.get('/forgotpassword/:email', function (req, res, next) {
    var useremail = req.params.email.trim().toLowerCase();

    console.log('')
    console.log(useremail);
    console.log('')

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
                subject: 'Reset du mot de passe Espace Membre Smalt',
                context: {
                    url: 'https://membre.smaltonline.com/resetpassword?token=' + token,
                    name: user.firstName
                }
            };

            smtpTransport.sendMail(data, function (err) {
                if (!err) {
                    console.log(data);
                    console.log('envoye');
                    return res.json({ message: 'Un email vous a été envoyé' });
                } else {
                    return done(err);
                }
            });
        }
    ], function (err) {
        return res.status(422).json({ message: err });
    });
});



//Gestion du panier
router.post('/addProductsInBasket/:idProduct', function (req, res, next) {
    var idProduct = req.params.idProduct;

    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 27',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Ajout au panier : Impossible de trouver l'utilisateur" }
            });
        }

        Product.findById(idProduct, function (err, product) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 28',
                    error: err
                });
            }
            if (!product) {
                return res.status(500).json({
                    title: 'No Product Found!',
                    error: { message: 'No Product Found' }
                });
            }

            //On ajoute au panier
            user.panier.push(product._id);
        })

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 29',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Product added in basket',
                obj: result
            });
        });
    })
});


router.post('/removeProductsFromBasket/:idProduct', function (req, res, next) {
    var idProduct = req.params.idProduct;

    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 30',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Retrait du panier : Impossible de trouver l'utilisateur" }
            });
        }

        Product.findById(idProduct, function (err, product) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 31',
                    error: err
                });
            }
            if (!product) {
                return res.status(500).json({
                    title: 'No Product Found!',
                    error: { message: 'No Product Found' }
                });
            }

            //On ajoute au panier
            user.panier.splice(user.panier.indexOf(product._id), 1);
        })

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 32',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Product removed from basket',
                obj: result
            });
        });
    })
});




router.post('/emptyBasket', function (req, res, next) {

    User.findOne({ email: req.body.email.trim().toLowerCase() }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - user 30',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: { message: "Retrait du panier : Impossible de trouver l'utilisateur" }
            });
        }

        user.panier = [];

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - user 32',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Product removed from basket',
                obj: result
            });
        });
    })
});

module.exports = router;
