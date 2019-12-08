const Order = require('../models/Order');

module.exports = {
    async store(req, res) {
        const { order_id } = req.params;

        console.log("------->order_id: ", order_id);

        const order = await Order.findById(order_id).populate('client');



        console.log("entrou, foi aceite o pedido");

        order.approved = false;


        await order.save();

        console.log("------->order_client_id: ", order.client._id);

        console.log(req.connectdUsers[order.client._id]);
        console.log(req.connectdUsers);

        orderClientSocket = req.connectdUsers[order.client._id];

        if (orderClientSocket) {
            req.io.to(orderClientSocket).emit('order_response', order);
        }

        return res.json(order);
    },
}