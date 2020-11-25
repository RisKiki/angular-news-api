const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../config/tools');

const Article = require('../models/article');

const currentRoute = "articles";

router.post('/create', (req, res, next) => {
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

router.get('/byId', (req,res,next) => {
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

router.get('/all', (req,res,next) => {
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