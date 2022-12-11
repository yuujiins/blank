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
                const data = {
                    status: 1,
                    insertedId: result.insertedId,
                    user: user,
                    token: token
                }
                res.json(data);
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