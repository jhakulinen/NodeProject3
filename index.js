const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const dbConfig = require("./config/development.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the database!")
}).catch(err => {
    console.log("Failed to connect to the database.", err)
    process.exit();
})

app.get("/", (req, res) => {
    res.send("Hello!")
});

require("./app/routes/music.routes")(app);

app.listen(PORT, () => {
    console.log("Server is running!")
})


