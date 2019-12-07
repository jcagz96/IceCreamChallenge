const Restaurant = require('../models/Restaurant');

module.exports = {
    async index(req, res) {
        const restaurants = await Restaurant.find();

        var sabores = []

        restaurants.map(r => {
            r.iceCream.map(f => {
                if (!sabores.includes(f.flavor)) {
                    sabores.push(f.flavor);
                }
            })
        });



        return res.json({ availableFlavors: sabores });
    }
}