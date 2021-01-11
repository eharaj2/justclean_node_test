const db = require("../models");
const config = require('../config/auth.config');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = (req, res)=>{

	const user = {
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	};

	User.create(user)
		.then(data => {
			res.send({
				success: true,
				message: "User has registered",
				data: data,
			})
		})
		.catch(err => {
			res.status(500)
				.send(
					{   success: false,
						message: "Exception Error",
						data: err.message,
					}
				);
		});
}

const login = (req, res)=>{
	try{
	User.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if(!user){
			res.status(404).send({
				success: true,
				message: "User not found !"
			});
		}

		if(!bcrypt.compareSync(req.body.password,user.password)){
			res.status(401).send({
				success: true,
				accessToken: null,
				message: "Invalid password"
			});
		}
			
			var token = jwt.sign({id: user.id}, config.secret,{
				expiresIn: 3600
			});

			user.access_token = token;
			user.save();
			res.send({
				success: true,
				data:user,					
			});

		})
	.catch(err => {
			res.status(500)
				.send(
					{   success: false,
						message: "Exception Error",
						data: err.message,
					}
				);
		});
	} catch(e){
		res.status(500)
				.send(
					{   success: false,
						message: "Exception Error",
						data: e.message,
					}
				);
		}

}

module.exports = {
	signup,
	login,
};