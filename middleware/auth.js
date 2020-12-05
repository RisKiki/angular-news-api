const jwt = require('jsonwebtoken');
const config = require('../config/config');

function auth(req, res, next) {
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, config.secretToken);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request! Token Error !')
        });
      }
}

module.exports = auth