const Movie = require('../models/Movie.js')

module.exports.controller = (app) => {
    //save a movie
    app.post('/movies',(req,res) => {
        const newMovie = new Movie({
            name: req.body.name,
            description: req.body.description,
            release_year: req.body.release_year,
            genre: req.body.genre,
        })
        newMovie.save((error,movie) => {
            if(error)
                console.log(error)
            res.send(movie)
        })
    })
    //fetch all movies
    app.get('/movies',(req, res) => {
        Movie.find({},'name description release_year genre', (err, movies)=>{
            if(err) console.log(err)
            res.send({
                movies,
            })
        })
    })
}