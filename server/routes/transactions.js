const express = require("express")

const transactionsRoute = express.Router();

const dbo = require("../db/connection")

const ObjectId = require("mongodb").ObjectId;

const auth = require("../middleware/auth");

transactionsRoute.route("/account/:id/transactions").get(auth, (req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id),
    }
    db_connect
        .collection("transactions")
        .find(query)
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
})

transactionsRoute.route('/account/:id/transactions/filter').post(auth, (req, res) => {
    console.log(new Date(req.body.dateTo).toISOString())
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id),
        date: {
            $gte: new Date(req.body.dateFrom),
            $lt: new Date(req.body.dateTo)
        }
    }
    console.log(query)
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
        description: (req.body.type === "deposit" ? "Deposit to account"
                : req.body.type === 'transfer' ? 'Transferred money to ' + req.body.recipientEmail
                : req.body.type === 'receive' ? 'Received money from ' + req.body.senderEmail
                : req.body.type === 'expense' ? req.body.description : 'Withdrawn from account'),
        date: new Date(req.body.date),
        time: req.body.time,
        amount: (req.body.type === "withdraw" || req.body.type === "transfer" ? req.body.amount * -1: req.body.amount * 1),
        runningBalance: req.body.runningBalance
    }
    db_connect
        .collection("transactions")
        .insertOne(query, (error, result) => {
            if (error) throw error;
            result.status = 1;
            res.json(result);
        });
})

module.exports = transactionsRoute;