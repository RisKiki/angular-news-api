const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../tools/tools');

const Article = require('../models/article');

const currentRoute = "articles";

router.post('/create', (req, res) => {
    const properties = ['title','description','image']
    const check      = checkBody(properties,req);

    if (!check.valid){
        sendMissingProperties(check, currentRoute, req, res);
    } else {
        const article = new Article({
            _id        : new mongoose.Types.ObjectId(),
            title      : req.body.title,
            description: req.body.description,
            image      : req.body.image,
        });

        article
        .save()
        .then(
            (result) => sendSuccess(result, currentRoute, req, res)
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }    
});

router.post('/update', (req, res) => {
    const properties = ['id','title','description','image']
    const check      = checkBody(properties,req);

    if (!check.valid){
        sendMissingProperties(check, currentRoute, req, res);
    } else {

        const filter = { _id : req.body.id }
        const update = { 
            title      : req.body.title,
            description: req.body.description,
            image      : req.body.image
        }

        Article.updateOne(filter,update)
        .then(
            (result) => sendSuccess(result, currentRoute, req, res)
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }    
});

router.get('/byId', (req,res) => {
    const check = checkBody(['id'], req)
    const articleId = req.body.id;

    if (!check.valid) {
        sendMissingProperties(check, currentRoute, req, res);
    } else {
        Article.findById(articleId)
        .exec()
        .then(
            (result) => sendSuccess(result, currentRoute, req, res)
        )
        .catch(
            (err) => sendError(err,currentRoute, req, res)
        )
    }
});

router.get('/all', (req,res) => {
    Article.find({})
    .exec()
    .then(
        (result) => sendSuccess(result, currentRoute, req, res)
    )
    .catch(
        (err) => sendError(err,currentRoute, req, res)
    )
})

module.exports = router;