import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import ClientRegister from './pages/ClientRegister';
import RestaurantRegister from './pages/RestaurantRegister';
import DashboardClient from './pages/DashboardClient';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
                <Route path="/clientregister" component={ClientRegister} />
                <Route path="/restaurantregister" component={RestaurantRegister} />
                <Route path="/dashboardclient" component={DashboardClient} />
            </Switch>
        </BrowserRouter>
    );
}