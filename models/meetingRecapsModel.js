const mongoose = require('mongoose') 

const meetingRecapSchema = new mongoose.Schema({
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

module.exports = mongoose.model('MeetingRecap', meetingRecapSchema)