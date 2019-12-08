import React, { useEffect, useState, useMemo } from 'react';

import api from '../../services/api';

import socketio from 'socket.io-client';

import './styles.css';

export default function DashboardRestaurant(props) {

    const [requests, setRequests] = useState([]);
    const [restaurantName, setRestaurantName] = useState('');


    const user_id = localStorage.getItem('userIdRestaurant');

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: {
            user_id,
        }
    }), [user_id]);

    useEffect(() => {

        setRestaurantName(props.location.state.restaurantName);

        socket.on('order_request', data => {
            console.log("data-->", data);
            setRequests([...requests, data]);
        })
    }, [props.location.state.restaurantName, requests, socket]);


    async function handleAccept(id) {
        api.post(`/orders/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));

    }

    async function handleReject(id) {
        api.post(`/orders/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));

    }

    return (
        <>
            <h1> {restaurantName} Dashboard:</h1>


            {requests.length > 0 && (
                <h3>Os seguintes pedidos aguardam uma resposta:</h3>
            )}

            {requests.length === 0 && (
                <h3>Aguardando a chegade de pedidos:</h3>
            )}

            <div className="content">



                <ul className="notifications">
                    {requests.map(request => (
                        <li key={request._id}>
                            <p>
                                o cliente : <strong> {request.client.name}</strong> está a tentar comprar <strong>{request.icecream}</strong> à sua loja  <strong>( {request.restaurant.name} )</strong>
                            </p>
                            <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                            <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}