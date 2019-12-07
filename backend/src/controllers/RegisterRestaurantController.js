const Restaurant = require('../models/Restaurant');

module.exports = {
    async store(req, res) {
        const { name, email, password, iceCream, coordinateX, coordinateY } = req.body;



        var array = iceCream.split(',').map(i => i.trim())

        var array2 = [];

        array.map(element => array2.push({ flavor: element }));


        const restaurant = await Restaurant.create({
            name,
            email,
            password,
            iceCream: array2,
            coordinateX,
            coordinateY
        })

        return res.json(restaurant);
    }
}