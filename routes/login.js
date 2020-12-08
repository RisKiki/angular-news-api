const express   = require('express');
const router    = express.Router();
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../tools/tools');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config/config');
const UserAdmin = require('../models/user-admin');

const currentRoute = "login";

router.post('', (req, res) => {
    const prop = ['email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        UserAdmin.findOne()
        .where({
            email:req.body.email,
        })
        .then(
            (user) => {
                if (!user){
                    const err = new Error('Login does not exists');
                    err.status = 401;
                    sendError(err,currentRoute, req, res)
                } else {
                    bcrypt.compare(req.body.password, user.password)
                    .then(
                        (valid) => {
                            if (!valid) {
                                const err = new Error('Password does not match.');
                                err.status = 401;
                                sendError(err,currentRoute, req, res)
                            } else {
                                const data = {
                                    token: jwt.sign(
                                        { userId: user._id },
                                        config.secretToken
                                    )
                                }
                                sendSuccess(data, currentRoute, req, res)
                            }
                        }
                    )
                }
            }
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }
})

module.exports = router;