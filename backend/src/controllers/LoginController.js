const Client = require('../models/Client');
const Restaurant = require('../models/Restaurant');

module.exports = {
    async show(req, res) {
        const client = await Client.findOne({ email: req.body.email });

        const restaurant = await Restaurant.findOne({ email: req.body.email });

        if (!client && !restaurant) {
            console.log(`${req.body.email} doesn't exist in databases`);
            return res.status(400).json({ error: 'Email was not found' });
        }


        if (client) {
            if (req.body.password === client.password) {
                return res.json({ id: client._id, loginType: "Client", name: client.name, email: client.email });
            }
            else {
                return res.status(400).json({ error: 'wrong password' });
            }

        }


        if (restaurant) {
            if (req.body.password === restaurant.password) {
                return res.json({ id: restaurant._id, loginType: "Restaurant", name: restaurant.name, email: restaurant.email });
            }
            else {
                return res.status(400).json({ error: 'wrong password' });
            }

        }


    }
}