import React, { useState } from 'react';

import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(`${email} --- ${password}`);

        const response = await api.post('/login', { email, password });


        //teste branch socketIO_2


        if (response.data.loginType === 'Client') {
            console.log("esse user é cliente");
            localStorage.setItem('user', response.data.name);
            localStorage.setItem('type', response.data.loginType);
            localStorage.setItem('userIdClient', response.data.id);
            history.push('/');
        }
        else {
            if (response.data.loginType === 'Restaurant') {
                console.log("esse user é restaurante");
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('type', response.data.loginType);
                localStorage.setItem('userIdRestaurant', response.data.id);
                history.push('/dashboardrestaurant');
            }
            else {
                console.log("erro no login");

            }
        }
    }

    return (
        <>
            <p>
                Welcome

            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email*</label>
                <input
                    id="email"
                    type="email"
                    placeholder="your email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}

                />
                <label htmlFor="password">Password*</label>
                <input
                    id="password"
                    type="password"
                    placeholder="your password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}

                />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}