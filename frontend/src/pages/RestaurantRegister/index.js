import React, { useState } from 'react';

import api from '../../services/api';

export default function RestaurantRegister({ history }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [iceCream, setIceCream] = useState('');
    const [coordinateX, setCoordinateX] = useState(0);
    const [coordinateY, setCoordinateY] = useState(0);

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("-----------> " + iceCream);

        await api.post('/registerRestaurant', { name, email, password, iceCream, coordinateX, coordinateY });

        history.push('/login');
    }



    return (
        <>

            <h1>ClientRegister</h1>

            <form onSubmit={handleSubmit}>

                <label >Name*</label>
                <input
                    id="name"
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

                <label >Flavors*</label>
                <input
                    id="flavors"
                    type="text"
                    placeholder="available flavors separated by commas"
                    value={iceCream}
                    onChange={event => setIceCream(event.target.value)}


                />

                <label >Coordinate X*</label>
                <input
                    id="CoordinateX"
                    type="number"
                    placeholder="coordinate X"
                    value={coordinateX}
                    onChange={event => setCoordinateX(event.target.value)}

                />

                <label >Coordinate Y*</label>
                <input
                    id="CoordinateY"
                    type="number"
                    placeholder="coordinate Y"
                    value={coordinateY}
                    onChange={event => setCoordinateY(event.target.value)}

                />



                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}