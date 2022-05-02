const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UserController {

    index(req, res, next) {
        User.find({})
            .then(users => res.status(201).json(users))
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    signup(req, res, next) {

        User.find({ email: req.body.email })
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: 'Mail exists'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const user = new User({
                                email: req.body.email,
                                password: hash

                            });
                            user.save()
                                .then(result => {
                                    console.log(result)
                                    res.status(201).json({
                                        message: 'User created',
                                        createdUser: true
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err
                                    })
                                })
                        }
                    })
                }
            })


    }

    login(req, res, next){
        User.find({email: req.body.email})
            .then(user => {
                if(user.length < 1){
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                bcrypt.compare(req.body.password,user[0].password, (err, result) => {
                    if(err){
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    if(result){
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            }, 
                            process.env.JWT_KEY, 
                            {
                                expiresIn: "1h"
                            },

                        )
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        }) 
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    })
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
             })
     }

    remove(req, res, next){
        User.deleteOne({_id: req.params.id})
            .then(result => {
                res.status(200).json({
                    message: 'User deleted'
                   
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
             })
     }

}

module.exports = new UserController;