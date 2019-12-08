import React, { useState } from 'react';

import api from '../../services/api';
import { bold } from 'ansi-colors';
import { Link } from 'react-router-dom';

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
            history.push('/main');
        }
        else {
            if (response.data.loginType === 'Restaurant') {
                console.log("esse user é restaurante");
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('type', response.data.loginType);
                localStorage.setItem('userIdRestaurant', response.data.id);
                history.push('/dashboardrestaurant', { restaurantName: response.data.name });
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


            <Link to="/clientregister">
                <button className="btnPointer" style={{ marginTop: 20, fontWeight: bold, color: '#000', border: 0, backgroundColor: '#fff' }}>Register as client</button>
            </Link>

            <Link to="/restaurantregister">
                <button className="btnPointer" style={{ marginTop: 20, marginLeft: 138, fontWeight: bold, color: '#000', border: 0, backgroundColor: '#fff' }}>Register as Restaurant</button>
            </Link>





        </>
    )
}