const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    iceCream: [{
        flavor: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        }
    }],
    coordinateX: {
        type: Number,
        required: true,
    },
    coordinateY: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Restaurant', RestaurantSchema);