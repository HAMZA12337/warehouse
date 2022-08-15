var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');



// import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var categorieRouter = require('./routes/categorie');
var brandRouter = require('./routes/brand');
var productRouter = require('./routes/product');
var tokenRouter = require('./controllers/RefreshToken');

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/account', accountRouter);
app.use('/categorie', categorieRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/token', tokenRouter);

// app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//  routes to be accessed anywhere


module.exports = app;