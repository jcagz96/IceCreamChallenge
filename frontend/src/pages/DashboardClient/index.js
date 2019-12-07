import React, { useState, useEffect } from 'react';

import api from '../../services/api';





export default function DashboardClient(props) {

    const [iceCreamName, setIceCreamName] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [showRestaurant, setShowRestaurant] = useState(true);
    const [restaurantIndex, setRestaurantIndex] = useState(0);


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


    function handleBuy() {
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