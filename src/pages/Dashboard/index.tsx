import React, {
    useEffect,
    useState
} from 'react';

import api from '../../services/api';

interface UsersInterface {
    id: number;
    email: string;
    username: string;
    password: string;
    profile_picture: string;
    created_at: Date;
}

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UsersInterface>();

    useEffect(() => {
        (async function () {
            const id = localStorage.getItem('user_id');
            const { data } = await api.get(`/users/${id}`);

            setUserData(data);
        })()
    }, []);

    return (
        <>
            {/* Temporary */}
            <img src={`data:image/png;base64,${Buffer.from(userData?.profile_picture || '').toString("ascii")}`} alt='' style={{width:'100%'}} />
        </>
    );
};

export default Dashboard;
