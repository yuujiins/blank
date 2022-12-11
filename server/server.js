const express = require("express")
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));
app.use(require("./routes/account"));
app.use(require("./routes/expenses"));
app.use(require("./routes/transactions"));
//
const dbo = require("./db/connection")

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if(err) console.log(err);
    });
    console.log(`Server is running on port: ${port}`);
});