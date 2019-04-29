var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');
var sectionRoutes = require('./routes/section');
var productRoutes = require('./routes/product');
var notificationRoutes = require('./routes/notification');
var bonusRoutes = require('./routes/bonus');
var coursRoutes = require('./routes/cours');
var checkoutRoutes = require('./routes/checkout');
var apiRoutes = require('./routes/api');
var commandeRoutes = require('./routes/commande');
var bonuspageRoutes = require('./routes/bonuspage');
var emailsenderRoutes = require('./routes/emailsender');
var coupdecoeurRoutes = require('./routes/coupdecoeur');
var zapiermatchingRoutes = require('./routes/zapiermatching');

var xssFilter = require('x-xss-protection')


var app = express();
//mongoose.connect('mongodb://localhost:27017/node-angular');
var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect('mongodb://smaltadmin:smaltadmin@ds245228.mlab.com:45228/smalt-membership', options);
//mongoose.connect('mongodb://smaltadmin:smaltadmin@ds233309-a0.mlab.com:33309,ds233309-a1.mlab.com:33309/smalt-membership-prod?replicaSet=rs-ds233309', options);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xssFilter())
app.use(xssFilter({ setOnOldIE: true }))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/section', sectionRoutes);
app.use('/product', productRoutes);
app.use('/notification', notificationRoutes);
app.use('/bonus', bonusRoutes);
app.use('/cours', coursRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/api', apiRoutes);
app.use('/commande', commandeRoutes);
app.use('/bonuspage', bonuspageRoutes);
app.use('/emailsender', emailsenderRoutes);
app.use('/coupdecoeur', coupdecoeurRoutes);
app.use('/zapiermatching', zapiermatchingRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
