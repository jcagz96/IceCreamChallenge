import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Main({ history }) {

    const [icecreams, setIceCreams] = useState([]);
    const [user, setUser] = useState('Visitante')


    useEffect(() => {
        async function loadIceCreams() {



            const user = localStorage.getItem('user');
            console.log(user);

            const type = localStorage.getItem('type');
            console.log(type);

            setUser(user);

            const response = await api.get('/icecreams');

            setIceCreams(response.data.availableFlavors);


        }

        loadIceCreams();
    }, [])


    function handleChoice(icecream) {
        console.log(icecream);

        //history.push(`/dashboardclient:${icecream}`);
        history.push('/dashboardclient', { icecream });
    }

    return (
        <div className="container">
            <h2 className="welcome">Hi, {user}. Choose your IceCream</h2>

            {icecreams.map(icecream => (
                <div className="element" key={icecream}>
                    <h2>{icecream}</h2>
                    <button className="btn" onClick={() => handleChoice(icecream)}>Encomendar</button>
                </div>
            ))}
        </div>
    )
}