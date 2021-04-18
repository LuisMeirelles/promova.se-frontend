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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component, default: Default, ...rest}) => {
    const { authenticated } = useContext(Context);

    return (
        <Route {...rest} render={props => (
            authenticated
            ? (Component && <Component {...props} />)
            : <Default {...props} />
        )} />
    );
};

const Routes: React.FC = () => (
    <BrowserRouter>
        <ProtectedRoute
            exact path='/'
            component={Dashboard}
            default={Landing}
        />
        <Route path='/entrar' component={Login} />
        <Route path='/registrar' component={SignUp} />
    </BrowserRouter>
);

export default Routes;
