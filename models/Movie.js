const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  
    title: {
        type: String,
        require: true
    },

    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('movie', MovieSchema);