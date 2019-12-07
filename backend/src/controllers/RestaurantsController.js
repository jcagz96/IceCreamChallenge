const Restaurant = require('../models/Restaurant');

module.exports = {
    async index(req, res) {
        const restaurants = await Restaurant.find();




        return res.json(restaurants);
    }
}