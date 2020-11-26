
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
    res.status(200).json({
        status: {
            success: 1,
            route  : req.method+' : '+currentRoute+req.path
        },
        data: data
    })
}

function sendError(err, currentRoute, req, res) {
    res.status(500).json({
        status: {
            success: 0,
            route  : req.method+' : '+currentRoute+req.path
        },
        error: {
            status : error.status,
            message: error.message,
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