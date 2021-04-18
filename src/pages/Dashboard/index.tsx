import React, {
    useEffect,
    useState,
    useContext
} from 'react';

import api from '../../services/api';

import { Context } from '../../components/AuthProvider';

interface UsersInterface {
    id: number;
    email: string;
    username: string;
    password: string;
    profile_picture: string;
    created_at: Date;
}

const Dashboard: React.FC = () => {
    const { user } = useContext(Context);

    const [userData, setUserData] = useState<UsersInterface>();

    useEffect(() => {
        (async function () {
            const id = user.id;
            const { data } = await api.get(`/users/${id}`);

            setUserData(data);
        })()
    }, [user]);

    return (
        <>
            {/* Temporary */}
            <img src={`data:image/png;base64,${Buffer.from(userData?.profile_picture || '').toString("ascii")}`} alt='' style={{width:'100%'}} />
        </>
    );
};

export default Dashboard;
