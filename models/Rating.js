const mongoose  = require('mongoose')

const schema = mongoose.Schema

const ratingSchema = new schema({
    movie_id: String,
    user_id:String,
    rate: Number
})

const rating = mongoose.model('rating', ratingSchema)

module.exports = rating