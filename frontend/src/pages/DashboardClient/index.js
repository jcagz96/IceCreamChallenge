import React, { useState, useEffect } from 'react';

import api from '../../services/api';





export default function Dashboardclient(props) {

    const [iceCreamName, setIceCreamName] = useState('');
    const [restaurants, setRestaurants] = useState([]);


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





    return (
        <>
            <h2>You choose: {iceCreamName}</h2>
            {restaurants.map(r => (
                <div key={r.email}>
                    <p>Gelataria: {r.name}</p>
                    <p>Email: {r.email}</p>
                    <p style={{ marginBottom: 10 }}>Distancia: {r.distance}</p>

                </div>
            ))}
        </>
    )
}