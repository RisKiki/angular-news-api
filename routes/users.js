const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../tools/tools');

const User = require('../models/user');

const currentRoute = "users";

router.post('/create', (req, res) => {
    const prop = ['name','email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        const user = new User({
            _id     : new mongoose.Types.ObjectId(),
            name    : req.body.name,
            email   : req.body.email,
            password: req.body.password,
        })

        user
        .save()
        .then(
            (result) => sendSuccess(result, currentRoute, req, res)
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }
})

router.post('/login', (req, res) => {
    const prop = ['email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        User.findOne()
        .where({
            email:req.body.email,
            password:req.body.password,
        })
        .then(
            (result) => {
                if (result){
                    sendSuccess(result, currentRoute, req, res)
                } else {
                    const err = new Error('Password and login doesn\'t match.')
                    err.status = 404;
                    sendError(err,currentRoute, req, res)
                }
            }
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }
})

module.exports = router;