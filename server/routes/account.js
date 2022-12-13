const express = require("express")

const accountRoutes = express.Router();

const dbo = require("../db/connection")

const ObjectId = require("mongodb").ObjectId;

const generator = require("creditcard-generator")

const auth = require("../middleware/auth");


accountRoutes.route("/account/:id").get(auth,(req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id)
    }
    db_connect
        .collection("accounts")
        .findOne(query, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
});

accountRoutes.route("/account/:id").post(auth,(req, res) => {
    let db_connect = dbo.getDb();
    let account = {
        userId: ObjectId(req.params.id),
        cardNumber: generator.GenCC("VISA"),
        CVV: Math.floor(Math.random()*(999-100+1)+100),
        funds: 0.00
    };
    db_connect
        .collection("accounts")
        .insertOne(account, (err, result) => {
            if(err) throw err;
            result.status = 1;
            res.json(result);
        })
})

accountRoutes.route("/account/:id").put(auth,(req, res) => {
    let db_connect = dbo.getDb();
    let account = {
        userId: ObjectId(req.params.id)
    };
    let query = {
        $set: {
            funds: parseFloat((Math.round(req.body.funds * 100) / 100).toFixed(2))
        }
    };
    db_connect
        .collection("accounts")
        .updateOne(account, query, (err, result) => {
            if(err) throw err;
            result.status = 1;
            res.json(result);
        })
})

accountRoutes.route("/account/:id").delete(auth,(req, res) => {
    let db_connect = dbo.getDb();
    let account = {
        userId: ObjectId(req.params.id)
    };
    db_connect
        .collection("accounts")
        .deleteOne(account, (err, result) => {
            if(err) throw err;
            res.json(result);
        })
})

module.exports = accountRoutes;