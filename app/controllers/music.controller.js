const Music = require("../models/music.model.js");

//Create and save a new title
exports.create = (req, res) => {
    //Validating the title
    if(!req.body.title) {
        return res.status(400).send({
            message: "You have to enter the title!"
        });
    }

    //Create a new title
    const newMusic = new Music({
        title: req.body.title,
        artist: req.body.artist
    });

    //Saving to database
    newMusic.save()
        .then(oMusic => {
            res.send(oMusic);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating the new music title."
            });
        });
};

//Get all music titles
exports.getAll = (req, res) => {
    Music.find()
        .then(oMusic => {
            res.send(oMusic);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retrieving the data."
            });
        });
};

//Get a music title with ID
exports.getById = (req, res) => {
    Music.findById(req.params.musicId)
        .then(oMusic => {
            if(oMusic) {
                res.send(oMusic);
            }
            return res.status(404).send({
                message: "No music available with given id" + req.params.musicId
            });
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "No music available with given id" + req.params.musicId
                });
            }
            return res.status(500).send({
                message: "Error retrieving music with id" + req.params.musicId
            });
        });
};

//Update the title with the ID
exports.update = (req, res) => {
    //Validating the title
    if(!req.body.title) {
        return res.status(400).send({
            message: "You have to enter the title!"
        });
    }

    //Find a music title and update it
    Music.findByIdAndUpdate(req.params.musicId, {
        title: req.body.title,
        artist: req.body.artist
    }, {new: true})
        .then(oMusic => {
            if(oMusic) {
                res.send(oMusic);
            }
            return res.status(404).send({
               message: "No music available with given id" + req.params.musicId 
            });
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "No music available with given id" + req.params.musicId
                });
            }
            return res.status(500).send({
                message: "Error retrieving music with id" + req.params.musicId
            });
        }); 
};

//Deleting a music title with ID
exports.delete = (req, res) => {
    Music.findByIdAndRemove(req.params.musicId)
        .then(oMusic => {
            if(oMusic) {
                res.send({message: "Music title has been deleted!"});
            }
            return res.status(404).send({
                message: "No music available with given id" + req.params.musicId
            });
        }).catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "No music available with given id" + req.params.musicId
                });
            }
            return res.status(500).send ({
                message: "Error retrieving music with id" + req.params.musicId
            });
        });
};