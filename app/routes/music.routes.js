module.exports = (app) => {
    const music = require("../controllers/music.controller.js")

    //Add new music
    app.post("/api/add", music.create);

    //Get all music
    app.get("/api/getall", music.getAll);

    //Get a single title with ID
    app.get("/api/:id", music.getById);

    //Update a title with ID
    app.put("/api/update/:id", music.update);

    //Delete title with ID
    app.delete("/api/delete/:id", music.delete)
}