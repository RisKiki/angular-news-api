const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const checkBody = require('../config/tools');

const Article = require('../models/article');

const currentRoute = "articles";

router.post('/create', (req, res, next) => {
    const properties = ['title','description','image']
    const check      = checkBody(properties,req);

    if (!check.valid){
        res.status(520).json({
            status: {
                success: 0,
                route  : req.method+' : '+currentRoute+'/'+req.path
            },
            error : {
                status           : 5201,
                message          : "There are missing properties in the request.",
                propertiesMissing: check.empty
            },
            params : req.body,
            data: {}
        })
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
            (result) => {
                res.status(200).json({
                    status: {
                        success: 1,
                        route  : req.method+' : '+currentRoute+'/'+req.path
                    },
                    data: {
                        article
                    },
                    result
                })
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    status: {
                        success: 0,
                        route  : req.method+' : '+currentRoute+'/'+req.path
                    },
                    error: {
                        status : error.status,
                        message: error.message,
                        error  : err,
                    }
                });
            }
        );
    }    
});

module.exports = router;