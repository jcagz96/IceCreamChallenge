const Client = require('../models/Client');

module.exports = {
    async store(req, res) {

        const { name, email, password, creditCard } = req.body;
        const client = await Client.create({
            name,
            email,
            password,
            creditCard,
        })

        return res.json(client);
    }
}