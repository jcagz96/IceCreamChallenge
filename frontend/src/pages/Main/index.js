import React, { useState, useEffect } from 'react';

import api from '../../services/api';

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
            <h1>CHOOSE YOU ICECREAM {user}</h1>

            {icecreams.map(icecream => (
                <div key={icecream}>
                    <h2>{icecream}</h2>
                    <button onClick={() => handleChoice(icecream)}>Encomendar</button>
                </div>
            ))}
        </div>
    )
}