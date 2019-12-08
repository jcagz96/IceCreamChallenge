const Client = require('../models/Client');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

module.exports = {
    async store(req, res) {
        const { icecream, restaurant, client, price } = req.body;

        console.log(" --> " + icecream);
        console.log(" --> " + restaurant);
        console.log(" --> " + client);
        console.log(" --> " + price);

        const order = await Order.create({
            icecream,
            restaurant,
            client,
            price,
        })



        const ownerSocket = req.connectdUsers[client];

        if (ownerSocket) {
            console.log("deuuu");
            req.io.to(ownerSocket).emit('order_request', order);
        }

        return res.json(order);
    }
}