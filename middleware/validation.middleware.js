const validator = require('../helpers/validate');
const db = require('../models');
const User = db.user;
const createTower = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "location": "required|string",
        "number_of_offices": "required|numeric",
        "number_of_floors": "required|numeric",
        "rating": "required|numeric",
        'latitude': "required|string",
        'longitude': "required",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}


const updateTower = (req, res, next)=>{

    const validationRule = {
        "id" : "required|numeric",
        "name": "required|string",
        "location": "required|string",
        "number_of_offices": "required|numeric",
        "number_of_floors": "required|numeric",
        "rating": "required|numeric",
        'latitude': "required|string",
        'longitude': "required",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {

            next();
        }
    });

}

const signup = (req, res, next)=>{
    const validationRule = {
        "name": "required|string",
        "email": "required|email",
        "password": "required",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {

            User.findOne({where:{email: req.body.email}})
                .then(data => {
                    if(data){
                            res.status(400)
                            .send({
                                success: false,
                                message: 'Failed! Email is already in use',
                            }); 
                         }
                });


            next();
        }
    });
}

const login = (req, res, next)=>{
    const validationRule = {
        "email": "required|email",
        "password": "required",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {

            next();
        }
    });
}

module.exports = { 
  createTower,
  updateTower,
  signup,
  login,
}