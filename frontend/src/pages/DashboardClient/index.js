import React, { useState, useEffect, useMemo } from 'react';

import api from '../../services/api';

import socketio from 'socket.io-client';

export default function DashboardClient(props) {

    const [iceCreamName, setIceCreamName] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [showRestaurant, setShowRestaurant] = useState(true);
    const [restaurantIndex, setRestaurantIndex] = useState(0);


    const user_id = localStorage.getItem('userIdClient');

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: {
            user_id,
        }
    }), [user_id]);

    useEffect(() => {

        socket.on('order_response', data => {
            console.log("resposta-->", data);
            alert(`Sua pedido de gelado de ${data.icecream} foi ${data.approved ? 'APROVADO' : 'REJEITADO'}`);
        })
    }, [socket]);


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



    async function handleBuy() {

        var restaurantId = restaurants[restaurantIndex].id;
        var clientId = localStorage.getItem('userIdClient');

        console.log(restaurantId);
        console.log("cliente no localstorage : " + clientId);


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