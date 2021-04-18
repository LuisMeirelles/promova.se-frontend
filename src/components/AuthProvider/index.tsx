import React, {
    createContext,
    useState,
    useEffect
} from 'react';

import api from '../../services/api';

interface ILoginData {
    user: string;
    password: string;
}

interface IAuthenticationHandler {
    (loginData: ILoginData): Promise<void>
};

interface IContext {
    authenticated: boolean;
    authenticationHandler: IAuthenticationHandler;
}

export const Context = createContext<IContext>({
    authenticated: false,
    authenticationHandler: () => new Promise(() => {})
});

const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;

            setAuthenticated(true);
        }

        setLoaded(true);
    }, []);

    const authenticationHandler: IAuthenticationHandler = async (loginData) => {
        const { data: { token, id } } = await api.post('/users/auth', loginData);

        localStorage.setItem('token', token);
        localStorage.setItem('user_id', id);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setAuthenticated(true);
    }

    if (!loaded) {
        return <h1>LOADING...</h1>
    }

    return (
        <Context.Provider value={{ authenticated, authenticationHandler }}>
            {children}
        </Context.Provider>
    );
}

export default AuthProvider;
