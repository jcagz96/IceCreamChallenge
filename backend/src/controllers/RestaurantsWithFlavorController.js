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


        //order restaurant by distance
        results.sort(function (a, b) {
            if (a.distance < b.distance) //sort string ascending
                return -1
            if (a.distance > b.distance)
                return 1
            return 0 //default return value (no sorting)
        })


        console.log(results);
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