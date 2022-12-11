const express = require("express")

const transactionsRoute = express.Router();

const dbo = require("../db/connection")

const ObjectId = require("mongodb").ObjectId;

const auth = require("../middleware/auth");

transactionsRoute.route("/account/:id/transactions").get(auth, (req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id),
        $or: [
            {
                type: "deposit"
            },
            {
                type: "withdrawal"
            }
        ]
    }
    db_connect
        .collection("transactions")
        .find(query)
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
})

transactionsRoute.route("/account/:id/transactions").post(auth, (req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id),
        type: req.body.type,
        description: (req.body.type === "deposit" ? "Deposit to account":"Withdrawal from account"),
        date: req.body.date,
        amount: (req.body.type === "deposit" ? req.body.amount: req.body.amount * -1)
    }
    db_connect
        .collection("transactions")
        .insertOne(query, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
})

module.exports = transactionsRoute;