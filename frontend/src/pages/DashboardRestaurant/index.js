import React, { useEffect, useState, useMemo } from 'react';

//import api from '../../services/api';

import socketio from 'socket.io-client';

export default function DashboardRestaurant() {

    const [requests, setRequests] = useState([]);


    const user_id = localStorage.getItem('userId');

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

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.client.name}</strong> está solicitando uma reserva em <strong>{request.icecream}</strong> à loja <strong>{request.restaurant.name}</strong>
                        </p>
                        <button className="accept" onClick={() => { }}>ACEITAR</button>
                        <button className="reject" onClick={() => { }}>REJEITAR</button>
                    </li>
                ))}
            </ul>
        </>
    )
}