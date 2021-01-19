let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user.js');  
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

router.post('/create', function(req, res){
   User.create ({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
   })
   
    .then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            
            res.json({
                user: user, 
                message: "User successfully created",
                sessionToken: token
       });
    } 
    )
    .catch(function(err){
        res.status(500).json({error: err}); 
    });
});
    
    router.post('/login', function(req, res){
        User.findOne({where: { email: req.body.user.email}
        
        }
        )

        .then(function loginSuccess(user){
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                        if (matches) {
                            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

                res.status(200).json({
                    user: user, 
                    message: "User successfully logged in!",
                    sessionToken: token
                })
            } else {
                res.status(502).send({error: "Login Failed"});
            }
        });
            }else{
                res.status(500).json({error: "User doesn't exist"})
            }
                
        })
            .catch(function (err) {
                res.status(500).json({error: err});
            })
        });
    
module.exports = router;

