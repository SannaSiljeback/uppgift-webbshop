const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemsSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const LineItems = mongoose.model('lineItems', lineItemsSchema);

module.exports = LineItems;