const Restaurant = require('../models/Restaurant');

module.exports = {
    async show(req, res) {

        const { flavor } = req.body;

        const restaurants = await Restaurant.find({
            iceCream: {
                $elemMatch: { flavor: flavor },
            }
        })


        var results = [];

        restaurants.map(r => {
            const distance = Math.sqrt((r.coordinateX ** 2) + (r.coordinateY ** 2));
            var obj = {
                name: r.name,
                email: r.email,
                chosenFlavor: flavor,
                distance: distance
            }
            results.push(obj);
        })

        /*
        var restaurantWithLessDistance = results[0];

        results.map(r => {
            if (r.distance < restaurantWithLessDistance.distance) {
                restaurantWithLessDistance = r;
            }
        })
        */

        return res.json(results);
    }
}