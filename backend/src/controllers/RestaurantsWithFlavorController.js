const Restaurant = require('../models/Restaurant');

module.exports = {
    async show(req, res) {

        const restaurants = await Restaurant.find({
            iceCream: {
                $elemMatch: { flavor: 'baunilha' },
            }
        })

        return res.json(restaurants);
    }
}