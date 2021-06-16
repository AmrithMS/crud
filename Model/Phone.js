const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
    PhoneNumber: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        require: true
    }
})

const Phone = mongoose.model("Phone",PhoneSchema);
module.exports = Phone;