
function checkBody(properties, req) {
    const emptyProp = properties.filter(prop => 
        !req.body.hasOwnProperty(prop)
    );

    return {
        valid : emptyProp.length === 0,
        empty : emptyProp
    }
}

function sendMissingProperties(check, currentRoute, req, res) {
    res.status(400).json({
        status: {
            success: 0,
            route  : req.method+' : '+currentRoute+req.path
        },
        error : {
            status           : 400,
            message          : "There are missing properties in the request.",
            propertiesMissing: check.empty
        },
        params : req.body
    })
};

function sendSuccess(data, currentRoute, req, res) {
    console.log({
        status: {
            success: 1,
            route  : req.method+' : '+currentRoute+req.path
        },
        params : req.params,
        body : req.body,
        token : req.headers.authorization,
        data: data
    })
    res.status(200).json({
        status: {
            success: 1,
            route  : req.method+' : '+currentRoute+req.path
        },
        data: data
    })
}

function sendError(err, currentRoute, req, res) {
    console.log({
        status: {
            success: 0,
            route  : req.method+' : '+currentRoute+req.path
        },
        params : req.params,
        body : req.body,
        token : req.headers.authorization,
        error: {
            status : err.status,
            message: err.message,
            error  : err,
        }
    })
    res.status(404).json({
        status: {
            success: 0,
            route  : req.method+' : '+currentRoute+req.path
        },
        error: {
            status : err.status,
            message: err.message,
            error  : err,
        }
    });
}

module.exports = {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
}