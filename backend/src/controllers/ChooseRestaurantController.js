

module.exports = {
    async show(req, res) {

        var { availableRestaurants } = req.body;

        var restaurantWithLessDistance = availableRestaurants[0];

        availableRestaurants.map(r => {
            if (r.distance < restaurantWithLessDistance.distance) {
                restaurantWithLessDistance = r;
            }
        })



        availableRestaurants = availableRestaurants.filter(item => item !== restaurantWithLessDistance);

        return res.json({ choosen: restaurantWithLessDistance, rest: availableRestaurants })
    }
}