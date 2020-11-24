
function checkBody(properties, req) {
    emptyProp = [];
    properties.forEach(prop => {
        if (!req.body.hasOwnProperty(prop)) {
            emptyProp.push(prop)
        }
    });

    return {
        valid : emptyProp.length === 0,
        empty : emptyProp
    }
}

module.exports = checkBody