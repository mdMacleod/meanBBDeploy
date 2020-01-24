console.log('*****ROUTES*****');
const path =  require("path");
const pets = require('../controllers/pets.js')

module.exports = function(app) {

    app.get('/app/pets/all', function(req, res) {
        pets.index(req, res);
    })

    app.get('/app/pets/:id', function(req, res) {
        console.log("***ROUTESJS***", req.params.id)
        pets.show(req, res);
    })

    app.post('/app/pets/create', function(req, res) {
        pets.create(req, res);
    })

    app.put('/app/pets/update', function(req, res) {
        console.log("**UPDATE ROUTE***", req.body)
        pets.update(req, res);
    })

    app.delete('/app/pets/destroy/:id', function(req, res) {
        console.log("***DELETE_IN_ROUTES_JS***")
        pets.destroy(req, res);
    })

    app.put('/app/upvote', function(req, res) {
        pets.upvote(req, res);
    })

    app.put('/app/downvote', function(req, res) {
        pets.downvote(req, res);
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    })

}