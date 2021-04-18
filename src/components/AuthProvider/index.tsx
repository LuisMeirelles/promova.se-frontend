import React, {
    createContext,
    useState,
    useEffect
} from 'react';

import api from '../../services/api';

interface IUser {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    profile_picture?: string;
    created_at?: Date;
}

interface ILoginData {
    user: string;
    password: string;
}

interface IAuthHandler {
    (data: ILoginData | string): Promise<void>
}

interface IContext {
    user: IUser
    authenticated: boolean;
    authenticationHandler: IAuthHandler;
}

export const Context = createContext<IContext>({
    user: {},
    authenticated: false,
    authenticationHandler: () => new Promise<void>(() => {})
});

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUser>({});
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            const token = localStorage.getItem('token');

            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`;

                const { data: {
                    ...userData
                }} = await api.post<IUser>('/users/auth', {token});

                setAuthenticated(true);
                setUser(userData);
            }

            setLoaded(true);
        })()
    }, []);

    const authenticationHandler: IAuthHandler = async (data) => {
        const { data: {
            token,
            ...userData
        }} = await api.post<IUser & {token: string}>('/users/auth', data);

        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setAuthenticated(true);
        setUser(userData);
    }

    if (!loaded) {
        return <h1>LOADING...</h1>
    }

    return (
        <Context.Provider value={{ user, authenticated, authenticationHandler }}>
            {children}
        </Context.Provider>
    );
}

export default AuthProvider;
