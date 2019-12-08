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

        await order.populate('restaurant').populate('client').execPopulate();


        const ownerSocket = req.connectdUsers[restaurant];
        // const clientSocket = req.connectdUsers[client];

        if (ownerSocket) {
            console.log("deuuu");
            req.io.to(ownerSocket).emit('order_request', order);
        }

        /*
        if (clientSocket) {
            console.log("deuuu client");
            req.io.to(clientSocket).emit('order_request', order);
        }
        */

        return res.json(order);
    }
}