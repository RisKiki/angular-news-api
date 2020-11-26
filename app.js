const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose')
const config     = require('./config/config');

const articleRoutes = require('./routes/articles')
const userRoutes    = require('./routes/users')

mongoose.connect(
    config.dburi,
    { 
        useNewUrlParser   : true,
        useUnifiedTopology: true
    }
);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*'),
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods','GET, POST');
        return res.status(200).json({});
    }
    next();
})

app.use('/articles', articleRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        'name' : 'angular-news-api',
        'version' : '1.0.0',
        'author' : "Disdier Alexandre",
        'git' : 'https://github.com/RisKiki/angular-news-api'
    });
})

app.use((req,res,next) => {
    const error  = new Error('Route doesn\'t exist.');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        status: {
            success: 0,
            route  : req.method+' : '+req.path
        },
        error: {
            status : error.status,
            message: error.message,
            error,
        }
    })
})
module.exports = app;