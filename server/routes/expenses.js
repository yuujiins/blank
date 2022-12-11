const express = require("express")

const expensesRoute = express.Router();

const dbo = require("../db/connection")

const ObjectId = require("mongodb").ObjectId;

const auth = require("../middleware/auth");

expensesRoute.route("/account/:id/expenses").get(auth, (req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id),
        type: "expense"
    }
    db_connect
        .collection("transactions")
        .find(query)
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
})

expensesRoute.route("/account/:id/expenses").post(auth, (req, res) => {
    let db_connect = dbo.getDb();
    let query = {
        userId: ObjectId(req.params.id),
        type: "expense",
        description: req.body.description,
        date: req.body.date,
        amount: req.body.amount * -1
    }
    db_connect
        .collection("transactions")
        .insertOne(query, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
})

expensesRoute.route("/account/:id/expenses").put(auth, (req, res) => {
    let db_connect = dbo.getDb();
    let expense = {
        userId: ObjectId(req.params.id),
        type: "expense",
    };
    let query = {
        $set: {
            description: req.body.description
        }
    };
    db_connect
        .collection("transactions")
        .updateOne(expense, query, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
})

module.exports = expensesRoute;