import React, { useEffect, useState, useMemo } from 'react';

import api from '../../services/api';

import socketio from 'socket.io-client';

export default function DashboardRestaurant() {

    const [requests, setRequests] = useState([]);


    const user_id = localStorage.getItem('userIdRestaurant');

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: {
            user_id,
        }
    }), [user_id]);

    useEffect(() => {

        socket.on('order_request', data => {
            console.log("data-->", data);
            setRequests([...requests, data]);
        })
    }, [requests, socket]);


    async function handleAccept(id) {
        api.post(`/orders/${id}/approvals`);
    }

    async function handleReject(id) {
        api.post(`/orders/${id}/rejections`);
    }

    return (
        <>
            <h1>Dashboard:</h1>

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
        </>
    )
}