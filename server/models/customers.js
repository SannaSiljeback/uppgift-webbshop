const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Customers = mongoose.model('customers', customerSchema);

module.exports = Customers;