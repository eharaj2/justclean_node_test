const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

////// Verify Api Token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-api-key"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    //////// Check in user table
    User.findOne({
      where:{access_token: token}
    }).then(data => {
      if(!data){
       return res.status(401).send({
        message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
    
  });
};

module.exports = {
  verifyToken,
};