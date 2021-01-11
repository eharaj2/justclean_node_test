const bcrypt = require('bcryptjs');
module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        access_token: {
            type: Sequelize.STRING
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });

///////// Sync user and insert data
    User.sync().then(()=>{
            User.findAll()
                .then(data=>{
                    if(data.length <= 0){
                        User.create({
                            name: 'Husain',
                            email: 'test@test.com',
                            password: bcrypt.hashSync('123456', 8)
                        })
                    }
                })
        }
        );
 
    return User;
 
}