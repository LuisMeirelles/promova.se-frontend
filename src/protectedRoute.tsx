import React, {
    useContext
} from 'react';
import {
    Route, RouteComponentProps, RouteProps
} from 'react-router-dom';

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

export default ProtectedRoute;
