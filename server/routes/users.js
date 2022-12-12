const express = require("express")

const userRoutes = express.Router();

const dbo = require("../db/connection")

const ObjectId = require("mongodb").ObjectId;

const jwt = require("jsonwebtoken")

const auth = require("../middleware/auth");

const bcrypt = require("bcryptjs");


//Gets all users
userRoutes.route("/users").get(auth,(req, res) => {
   let db_connect = dbo.getDb();
   db_connect
       .collection("users")
       .find({})
       .toArray((err, result) => {
           if(err) throw err;
           res.json(result)
       })
});
//Get specific user using id
userRoutes.route("/users/:id").get(auth,(req, res) => {
   let db_connect = dbo.getDb();
   let query = {
       _id: ObjectId(req.params.id)
   };
   db_connect
       .collection("users")
       .findOne(query, (err, result) => {
           if(err) throw err;
           res.json(result);
       });
});

userRoutes.route('/users/email').post((req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        email: req.body.email
    }
    console.log(req.body)
    db_connect
        .collection('users')
        .findOne(query, (err, result) => {
            if(err) throw err;
            if(result !== null){
                result.status = 1;
                db_connect
                    .collection('accounts')
                    .findOne({userId: result._id}, (err, rr) => {
                        result.userAccount = rr;
                        res.json(result)
                    })
            }
            else{
                res.json(result)
            }
        })
})

userRoutes.route("/login").post( (req, res) => {

    let db_connect = dbo.getDb();
    db_connect.collection("users").findOne({email: req.body.email}, (err, result) => {
        if (err) throw err;
        if(result == null) {
            let data = {
                status: 0,
                message: 'User not found'
            };
            res.json(data);
        }
        else{
            if(result){
                bcrypt.compare(req.body.password, result.password, (err, r) => {
                    if (err) throw err;
                    if (!r) {
                        let data = {
                            status: -1,
                            message: 'Invalid password'
                        }
                        res.json(data)
                    } else {
                        const token = jwt.sign({
                                userId: ObjectId(result._id),
                                role: result.role,
                                email: result.email
                            },
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: "3h"
                            });
                        result.token = token;
                        result.status = 1;
                        res.json(result);
                    }
                })
            }
            else{
                let data = {
                    status: -1,
                    message: 'Invalid password'
                }
                res.json(data)
            }
        }
    });


});

userRoutes.route('/verify').post((req, rr) => {
    let db_connect = dbo.getDb();
    let data = {
        userId: ObjectId(req.body.userId),
        otp: parseInt(req.body.otp)
    }
    db_connect
        .collection('verifyOTP')
        .findOne(data, (err, result) => {
            if(err) throw err;
            console.log(result)
            if(result == null){
                rr.json({
                    status: -1,
                    message: 'Incorrect OTP'
                })
            }
            else{
                db_connect
                    .collection('verifyOTP')
                    .deleteOne(data, (err, res) => {
                        if(err) throw err
                        if(res){
                            db_connect
                                .collection('users')
                                .updateOne({_id: ObjectId(req.body.userId)},{
                                    $set: {
                                        isMobileVerified: true,
                                        isActive: true
                                    }
                                }, (err, res) => {
                                    if(err) throw err
                                    if(res){
                                        rr.json({
                                            status: 1,
                                            message: 'Account verified successfully'
                                        })
                                    }
                                })

                        }
                    })
            }
        })

})

userRoutes.route('/checkOTP').post((req, res) => {
    let db_connect = dbo.getDb();
    let data = {
        userId: ObjectId(req.body.userId)
    }
    db_connect
        .collection('verifyOTP')
        .find(data)
        .toArray((err, result) => {
            if(err) throw err;
            if(result.length < 1){
                //Send new OTP
                const otp = Math.floor(Math.random()*(999999-100000+1)+100000)
                db_connect
                    .collection('verifyOTP')
                    .insertOne({
                        userId: ObjectId(req.body.userId),
                        otp: otp
                    }, (err, result) => {
                        if(err) throw err;
                        res.json({
                            status: 2,
                            otp: otp
                        })
                    })
            }
            else{
                //Verify existing OTP
                res.json({
                    status: 1,
                    otp: result[0].otp
                })
            }
        })
})

userRoutes.route("/users").post((req, res)=>{
    let db_connect = dbo.getDb();
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) throw err;
        let user = {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            email: req.body.email,
            address: req.body.address,
            mobileNumber: req.body.mobileNumber,
            birthDay: req.body.birthDay,
            isMobileVerified: false,
            isActive: false,
            isLocked: false,
            password: hash
        }
        db_connect
            .collection("users")
            .insertOne(user, (err, result) => {
                if (err) throw err;
                const token = jwt.sign({
                    user_id: result.insertedId
                }, process.env.TOKEN_KEY, {
                    expiresIn: "3h"
                })
                if(result.insertedId !== null){
                    const otp = Math.floor(Math.random()*(999999-100000+1)+100000)
                    db_connect
                        .collection("verifyOTP")
                        .insertOne({
                            userId: result.insertedId,
                            otp: otp
                        }, (err, result) => {
                            const data = {
                                status: 1,
                                insertedId: result.insertedId,
                                user: user,
                                token: token,
                                otp: otp
                            }
                            res.json(data);
                        })
                }
            })
    });

});

userRoutes.route("/users/:id").put(auth,(req, res)=>{
    let db_connect = dbo.getDb();
    let user = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            address: req.body.address
        }
    }
    db_connect
        .collection("users")
        .updateOne(user, newValues, (err, result) => {
            if (err) throw err;
            console.log("1 user updated!")
            res.json(result);
        })
});

userRoutes.route("/users/:id").delete(auth,(req, res) => {
   let db_connect = dbo.getDb();
   let query = {_id: ObjectId(req.params.id)};
   db_connect
       .collection("users")
       .deleteOne(query, (err, result) => {
           if(err) throw err;
           console.log("1 user deleted")
           res.json(result);
       })
});

module.exports = userRoutes;