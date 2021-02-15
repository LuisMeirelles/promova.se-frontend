import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Landing} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
        </BrowserRouter>
    );
}

export default Routes;
