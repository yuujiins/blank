const {MongoClient} = require("mongodb");
const DB = process.env.ATLAS_URI;
const client = new MongoClient(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            if(db){
                _db = db.db("bank")
                console.log("Successfully connected to MongoDB");
            }
            return callback(err)
        });
    },
    getDb: () => {
        return _db;
    }
};