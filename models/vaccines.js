const mongoose = require('mongoose')

const vaccineSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    company_email: {
        type: String,
        required: true
    },
    company_contact: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    number_of_dose: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Vaccine', vaccineSchema);