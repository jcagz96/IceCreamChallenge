const Client = require('../models/Client');

module.exports = {
    async store(req, res) {

        const { name, email, password, creditCard } = req.body;
        const client = await Client.create({
            name,
            email,
            password,
            creditCard,
            coordinateX: 6,
            coordinateY: 4
        })

        return res.json(client);
    }
}