import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './protectedRoute';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <ProtectedRoute
                exact path='/'
                component={Dashboard}
                default={Landing}
            />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
        </BrowserRouter>
    );
}

export default Routes;
