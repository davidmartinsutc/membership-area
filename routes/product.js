var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var path = require('path');

var Product = require('../models/product');
var Licence = require('../models/licence');
var Section = require('../models/section');


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



router.get('/:whatFor', function (req, res, next) {
    Product.find({ whatFor: req.params.whatFor })
        .sort('position')
        .populate('sections')
        .populate('linked_trainings')
        .populate('linked_products')
        .populate('offered_trainings')
        .exec(function (err, products) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - product 1',
                    error: err
                });
            }
            // On ajoute l'image
            res.status(200).json({
                message: 'Success',
                obj: products
            });
        });
});

router.get('/name/:productName', function (req, res, next) {
    Product.findOne({ name: req.params.productName })
        .populate('sections')
        .populate('linked_trainings')
        .populate('linked_products')
        .populate('offered_trainings')
        .exec(function (err, products) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - product 2',
                    error: err
                });
            }
            // On ajoute l'image
            res.status(200).json({
                message: 'Success',
                obj: products
            });
        });
});


router.post("/picture", upload.single("uploadFile"), function (req, res) {
    //On met à jour le chemin de l'image dans le produit grace a son ID
    Product.findById(req.body.productID, function (err, product) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred  - product 3',
                error: err
            });
        }
        if (!product) {
            return res.status(500).json({
                title: 'No Product Found!',
                error: { message: 'No Product Found to update the picture' }
            });
        }
        product.picture = req.file.location;
        product.save();
    })

    res.send(req.file);
});


router.post('/', function (req, res, next) {
    var product = new Product({
        name: req.body.name,
        picture: req.body.picture,
        description_preview: req.body.description_preview,
        description_detail: req.body.description_detail,
        benefits_detail: req.body.benefits_detail,
        position: req.body.position,
        whatFor: req.body.whatFor,
        value: req.body.value,
        price: req.body.price,
        activated: req.body.activated,
        video: req.body.video,
        temps: req.body.duree,
        maj: req.body.maj,
        second_title: req.body.second_title,
        fa_title: req.body.fa_title,
        link_to: req.body.link_to,
        formationProduit: req.body.formationProduit,
        downloadableBonus: req.body.downloadableBonus,
        iframelink: req.body.iframelink
    });

    if (req.body.sections) {
        req.body.sections.map(section => {
            product.sections.push(section.sectionID);
        });
    }

    if (req.body.linked_trainings) {
        req.body.linked_trainings.map(linked_training => {
            product.linked_trainings.push(linked_training.productID);
        });
    }

    if (req.body.linked_products) {
        req.body.linked_products.map(linked_product => {
            product.linked_products.push(linked_product.productID);
        });
    }

    if (req.body.offered_trainings) {
        req.body.offered_trainings.map(offered_training => {
            product.offered_trainings.push(offered_training.productID)
        })
    }

    product.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - product 4',
                error: err
            });
        }

        result.sections.map(section => {
            Section.findById(section, function (err, section) {
                if (err) {
                    return res.status(500).json({
                        title: 'Erreur update du produit dans la section',
                        error: err
                    });
                }
                if (!section) {
                    return res.status(500).json({
                        title: 'No product Found!',
                        error: { message: 'product not found' }
                    });
                }

                if (!section.products.includes(product._id)) {
                    section.products.push(product._id);
                    section.save();
                }

            })

        });

        res.status(201).json({
            message: 'Saved product',
            obj: result
        });
    });
});


router.post("/licence/:productID", function (req, res, next) {

    var licencesArray = JSON.parse(JSON.stringify(req.body));

    Product.findById(req.params.productID, function (err, product) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - product 5',
                error: err
            });
        }
        if (!product) {
            return res.status(500).json({
                title: 'No Product Found!',
                error: { message: 'No Product Found to update the picture' }
            });
        }

        licencesArray.map(licenceArray => {

            var plicence = new Licence({
                product: product,
                licenceID: licenceArray[0],
                licencePasswd: licenceArray[1],
                licenceKey: licenceArray[2]
            })

            plicence.save();
        });

        res.status(201).json({
            message: 'Saved licences',
            obj: 'Saved'
        });
    });
});


router.delete('/:productName', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Product.findOne({ name: req.params.productName }, function (err, product) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - product 6',
                error: err
            });
        }
        if (!product) {
            return res.status(500).json({
                title: 'No product Found!',
                error: { message: 'Product not found' }
            });
        }

        product.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - product 7',
                    error: err
                });
            }

            result.sections.map(sectionID => {
                Section.findById(sectionID, function (err, section) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred - product 8',
                            error: err
                        });
                    }
                    if (!section) {
                        return res.status(500).json({
                            title: 'No Section Found!',
                            error: { message: 'Message not found' }
                        });
                    }
                    section.products.pull(product._id);
                    section.save();
                })
            });

            res.status(200).json({
                message: 'Deleted product',
                obj: result
            });
        });
    });
});


router.patch('/:productName', function (req, res, next) {
    let saveSections = [];
    let saveLinkedProducts = [];
    let saveLinkedTrainings = [];
    let saveOfferedTrainings = [];

    Product.findOne({ name: req.params.productName }, function (err, product) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred - product 9',
                error: err
            });
        }
        if (!product) {
            return res.status(500).json({
                title: 'No product Found!',
                error: { message: 'product not found' }
            });
        }

        product.name = req.body.name;
        product.picture = req.body.picture;
        product.description_preview = req.body.description_preview;
        product.description_detail = req.body.description_detail;
        product.benefits_detail = req.body.benefits_detail;
        product.position = req.body.position;
        product.value = req.body.value;
        product.price = req.body.price;
        product.activated = req.body.activated;
        product.video = req.body.video;
        product.temps = req.body.duree;
        product.maj = req.body.maj;
        product.second_title = req.body.second_title;
        product.fa_title = req.body.fa_title;
        product.link_to = req.body.link_to;
        product.formationProduit = req.body.formationProduit;
        product.downloadableBonus = req.body.downloadableBonus;
        product.iframelink = req.body.iframelink;

        saveSections = Array.from(product.sections);
        product.sections = [];
        req.body.sections.map(section => {
            product.sections.push(section.sectionID);
        });

        saveLinkedProducts = Array.from(product.linked_products);
        product.linked_products = [];
        req.body.linked_products.map(linked_product => {
            product.linked_products.push(linked_product.productID);
        });

        saveLinkedTrainings = Array.from(product.linked_trainings);
        product.linked_trainings = [];
        req.body.linked_trainings.map(linked_training => {
            product.linked_trainings.push(linked_training.productID);
        });

        saveOfferedTrainings = Array.from(product.offered_trainings);
        product.offered_trainings = [];
        req.body.offered_trainings.map(offered_training => {
            product.offered_trainings.push(offered_training.productID);
        });




        product.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred - product 10',
                    error: err
                });
            }

            // On ajoute dans les nouvelles sections le produit si besoin
            result.sections.map(section => {
                Section.findById(section, function (err, section) {
                    if (err) {
                        return res.status(500).json({
                            title: 'Erreur update du produit dans la section',
                            error: err
                        });
                    }
                    if (!section) {
                        return res.status(500).json({
                            title: 'No product Found!',
                            error: { message: 'product not found' }
                        });
                    }

                    let contain = false;
                    section.products.map(productMap => {
                        if (productMap.toString() == product._id.toString()) {
                            contain = true;
                        }
                    })
                    if (!contain) {
                        section.products.push(product._id);
                        section.save();
                    }

                })

            });

            //On enleve le produit des sections si besoin
            saveSections.map(sectionId => {

                let contain = false;
                result.sections.map(sectionMap => {
                    if (sectionMap.toString() == sectionId.toString()) {
                        contain = true;
                    }
                })
                //Si on a pas trouve la section ancienne dans la liste des nouvelles, on met a jour l'ancienne
                if (!contain) {
                    //Section.findByIdAndUpdate(sectionId, { $pullAll: {products: product } } )

                    Section.findById(sectionId, function (err, section) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Erreur de la section',
                                error: err
                            });
                        }
                        if (!section) {
                            return res.status(500).json({
                                title: 'No section Found!',
                                error: { message: 'section not found' }
                            });
                        }
                        section.products.splice(section.products.indexOf(product._id), 1);


                        section.save()
                    })
                }

            })

            res.status(200).json({
                message: 'Updated product',
                obj: result
            });
        });
    });
});


module.exports = router;