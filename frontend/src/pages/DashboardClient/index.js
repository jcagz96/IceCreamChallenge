import React, { useState, useEffect, useMemo } from 'react';

import api from '../../services/api';

import socketio from 'socket.io-client';
import { Link } from 'react-router-dom';

import './styles.css';

export default function DashboardClient(props) {

    const [iceCreamName, setIceCreamName] = useState('');
    const [restaurants, setRestaurants] = useState([]);


    const user_id = localStorage.getItem('userIdClient');

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: {
            user_id,
        }
    }), [user_id]);

    useEffect(() => {

        socket.on('order_response', data => {
            console.log("resposta-->", data);
            alert(`Sua pedido de gelado de ${data.icecream} foi ${data.approved ? `APROVADO \no seu gelado foi enviado para a sua morada\n` : 'o seu gelado foi REJEITADO encomende na outra loja apresentada'}`);


        })
    }, [restaurants, socket]);


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

        //var restaurantId = restaurants[restaurantIndex].id;
        var restaurantId = restaurants[0].id;
        var clientId = localStorage.getItem('userIdClient');

        console.log(restaurantId);
        console.log("cliente no localstorage : " + clientId);


        await api.post('/orders', {
            icecream: iceCreamName,
            restaurant: restaurantId,
            client: clientId,
            price: "88",
        })

        restaurants.splice(0, 1);
        setRestaurants(restaurants.splice(0, 1))

        console.log(restaurants);

    }

    function handleShowMore() {
        restaurants.splice(0, 1);
        setRestaurants(restaurants.splice(0, 1))
    }



    return (
        <>
            <h1>You choose: {iceCreamName}</h1>

            {restaurants.length > 0 && (
                <div>
                    <p>
                        Gelataria: {restaurants[0].name}
                    </p>
                    <p>
                        Email: {restaurants[0].email}
                    </p>
                    <p>
                        Distancia: {restaurants[0].distance}
                    </p>
                    <p>
                        Tempo: {Math.round(restaurants[0].distance * 2)} minutos
                    </p>

                    <button className="btn" style={{ marginTop: 10, marginBottom: 10 }} onClick={handleBuy}>Buy</button>

                </div>
            )}

            {restaurants.length > 0 && (
                <>
                    <button className="btn" onClick={handleShowMore}>Show next</button>
                    <Link to="/main">
                        <button className="btn" style={{ marginTop: 10, marginBottom: 10 }}>Escolher outro sabor</button>
                    </Link>
                </>

            )}

            {restaurants.length === 0 && (
                <>
                    <p>
                        O seu gelado nao está disponivel em mais nenhuma gelataria
                </p>


                    <Link to="/main">
                        <button className="btn" style={{ marginTop: 10, marginBottom: 10 }}>Escolher outro sabor</button>
                    </Link>
                </>
            )}

        </>
    )
}