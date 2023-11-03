const mongoose = require('mongoose') 

const newsAndUpdatesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('NewsAndUpdates',newsAndUpdatesSchema)