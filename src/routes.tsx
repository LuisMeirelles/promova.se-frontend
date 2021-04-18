import React, { useContext } from 'react';
import {
    BrowserRouter,
    Route,
    RouteComponentProps,
    RouteProps
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import { Context } from './components/AuthProvider';

interface ProtectedRouteProps extends RouteProps {
    default: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component, default: Default, ...props}) => {
    const { authenticated } = useContext(Context);

    return (
        <Route {...props} render={props => {
            if (authenticated) {
                return Component && <Component {...props} />
            }

            return <Default {...props} />
        }} />
    );
};

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
