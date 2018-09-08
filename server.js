const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/movie_rating_app',{ useNewUrlParser: true })
.catch(err => {
    console.error('app starting error:', err.stack  );
    process.exit(1)
})

fs.readdirSync("controllers").forEach(function(file){
    if(file.substr(-3)=='.js'){
        const route = require('./controllers/'+file)
        route.controller(app)
    }
})

router.get('/',function(req,res) {
    res.json({message:'API Initialized'})
})

const port = process.env.API_Port || 8083
app.use('/',router)
app.listen(port, ()=>{
    console.log('Api running on port: '+port)
})
