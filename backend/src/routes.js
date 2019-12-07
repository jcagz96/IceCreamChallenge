const express = require('express');

const routes = express.Router();

const RegisterClientController = require('./controllers/RegisterClientController');
const RegisterRestaurantController = require('./controllers/RegisterRestaurantController');
const LoginController = require('./controllers/LoginController');
const IceCreamsController = require('./controllers/IceCreamsController');
const RestaurantsController = require('./controllers/RestaurantsController');
const RestaurantsWithAFlavor = require('./controllers/RestaurantsWithFlavorController')

routes.post('/registerClient', RegisterClientController.store);
routes.post('/registerRestaurant', RegisterRestaurantController.store);
routes.post('/login', LoginController.show);
routes.get('/restaurants', RestaurantsController.index);
routes.get('/icecreams', IceCreamsController.index);
routes.get('/restaurantsWithIceCream', IceCreamsController.index);
routes.get('/restaurantsflavor', RestaurantsWithAFlavor.show);



module.exports = routes;