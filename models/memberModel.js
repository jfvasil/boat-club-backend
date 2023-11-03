const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true, 
        unique: true
    },
    code :{
        type: String,
        required: true,
        unique: true
    },
    used : {
        type: Boolean,
        default: false
    },

})

const MemberRegistration = mongoose.model('MemberRegistration', memberSchema)