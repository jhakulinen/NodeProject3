const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const mongoose = require("mongoose");
//Lisätään tietokannan osoite muuttujaan.
var uri = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dajnq.mongodb.net/NodeProject3?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
//Yhdistetään ohjelma tietokantaan
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!")
}).catch(err => {
    console.log("Failed to connect to the database.", err)
    process.exit();
})

app.get("/", (req, res) => {
    res.send("Hello!")
});

//Tuodaan reitit erillisestä tiedostosta
require("./app/routes/routes")(app);

//Ohjelma kuuntelee ympäristön määrittämää porttia, tai porttia 8080
app.listen(PORT, () => {
    console.log("Server is running!")
})


