import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import socketio from 'socket.io-client';

export default function DashboardClient(props) {

    const [iceCreamName, setIceCreamName] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [showRestaurant, setShowRestaurant] = useState(true);
    const [restaurantIndex, setRestaurantIndex] = useState(0);

    const [requests, setRequests] = useState([]);


    useEffect(() => {
        async function loadIceCream() {


            console.log(props.location.state);
            setIceCreamName(props.location.state.icecream);
        }

        loadIceCream();
    }, [props.location.state])


    useEffect(() => {
        async function loadRestaurants() {

            if (iceCreamName !== "") {
                const response = await api.post('/restaurantsflavor', {
                    "flavor": iceCreamName
                });

                console.log(response.data);

                setRestaurants(response.data);
            }
        }

        loadRestaurants();
    }, [iceCreamName])

    /*
    useEffect(() => {

        const user_id = localStorage.getItem('userId');

        const socket = socketio('http://localhost:3333', {
            query: {
                user_id,
            }
        });

        socket.on('order_request', data => {
            console.log("data-->", data);
        })
    }, []);
    */

    async function handleBuy() {

        var restaurantId = restaurants[restaurantIndex].id;
        var clientId = localStorage.getItem('userId');

        console.log(restaurantId);
        console.log(clientId);


        await api.post('/orders', {
            icecream: iceCreamName,
            restaurant: restaurantId,
            client: clientId,
            price: "88",
        })

        setShowRestaurant(false);
        var idx = restaurantIndex + 1;

        if (idx < restaurants.length) {
            setRestaurantIndex(idx);
        }

        console.log(restaurants);
    }

    function handleShowMore() {
        setShowRestaurant(true);
    }

    return (
        <>
            <h1>You choose: {iceCreamName}</h1>

            {restaurants.length > 0 && showRestaurant && (
                <div>
                    <p>
                        Gelataria: {restaurants[restaurantIndex].name}
                    </p>
                    <p>
                        Email: {restaurants[restaurantIndex].email}
                    </p>
                    <p>
                        Distancia: {restaurants[restaurantIndex].distance}
                    </p>

                    <button onClick={handleBuy}>Buy</button>

                </div>
            )}

            <button onClick={handleShowMore}>Show more</button>
        </>
    )
}