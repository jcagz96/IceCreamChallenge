import React, { useState } from 'react';

import api from '../../services/api';

export default function ClientRegister({ history }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creditCard, setCreditCard] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        await api.post('/registerClient', { name, email, password, creditCard });

        history.push('/');
    }

    return (
        <>

            <h1>ClientRegister</h1>

            <form onSubmit={handleSubmit}>

                <label >Nome*</label>
                <input
                    id="nome"
                    placeholder="your name"
                    value={name}
                    onChange={event => setName(event.target.value)}

                />

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

                <label htmlFor="password">Credit card number*</label>
                <input
                    id="creditCard"
                    type="password"
                    placeholder="your credit card number"
                    value={creditCard}
                    onChange={event => setCreditCard(event.target.value)}

                />

                <button className="btn" type="submit">Register</button>
            </form>
        </>
    )
}