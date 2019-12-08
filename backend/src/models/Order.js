const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    icecream: {
        type: String,
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    price: {
        type: Number,
        required: true,
    },
    approved: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Order', OrderSchema);