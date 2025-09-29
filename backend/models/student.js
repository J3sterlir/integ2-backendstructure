const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentschema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Age:{
        type: Number,
        required: true,
        min:16
    }
}, { timestamps: true})

module.exports = mongoose.model('Student', studentschema)