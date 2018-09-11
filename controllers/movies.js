const Movie = require('../models/Movie.js')
const Rating  = require('../models/Rating.js')

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
    app.get('/movies/:id',(req,res)=>{
        Movie.findById(req.params.id,'name description release_year genre',(err,mov)=>{
            if(err) console.log(err)
            res.send(mov)
        })
    })
    app.post('/movies/rate/:id',(req,res)=>{
        const rating = new Rating({
            movie_id:req.params.id,
            user_id:req.body.user_id,
            rate: req.body.rate,
        })
        rating.save((err,ratings)=>{
            if(err)console.log(err)
            res.send({
                movie_id: ratings.movie_id,
                user_id: ratings.user_id,
                rate: ratings.rate
            })
        })
    })
    
}