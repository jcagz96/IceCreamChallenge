const Restaurant = require('../models/Restaurant');

module.exports = {
    async store(req, res) {
        const { name, email, password, iceCream } = req.body;

        const restaurant = await Restaurant.create({
            name,
            email,
            password,
            iceCream,
            coordinateX: 4,
            coordinateY: 4
        })

        return res.json(restaurant);
    }
}