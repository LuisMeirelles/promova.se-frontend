import React, {
    useState,
    FormEvent,
    ChangeEvent
} from 'react';

import { Redirect } from 'react-router-dom';

import {
    Container,
    Main
} from './styles';

import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import Fieldset from '../../components/Fieldset';
import InputBlock from '../../components/InputBlock';

import api from '../../services/api';

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState({
        user: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState({
        type: '',
        message: ''
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function handleLogin(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        try {
            await api.post(
                '/users/auth',
                loginData
            );

            setIsAuthenticated(true);
        } catch (error) {
            switch (error.response?.data.message) {
                case 'user not found':
                    setResponseMessage({
                        type: 'warning',
                        message: 'Usuário não encontrado'
                    });

                    break;

                case 'incorrect password':
                    setResponseMessage({
                        type: 'warning',
                        message: 'Senha incorreta'
                    });

                    break;

                case 'unexpected error while authenticating the user':
                    setResponseMessage({
                        type: 'error',
                        message: `Erro inesperado ao autenticar o usuário.\nPor favor, contate o suporte provendo as seguintes informações: ${error.response.data.message.error}`
                    });

                    break;
            }
        }
    }

    function setData(evt: ChangeEvent<HTMLInputElement>) {
        const {
            id,
            value
        } = evt.target;

        setLoginData({
            ...loginData,
            [id]: value
        });
    }

    return (
        <Container>
            <PageHeader
                title='Preencha os campos abaixo para fazer login.'
            />

            <Main>
                <Form
                    buttonText='Fazer Login'
                    footerMessage={responseMessage}
                    onSubmit={handleLogin}
                >
                    <Fieldset title='Login'>
                        <InputBlock
                            label='E-mail ou Nome de Usuário'
                            id='user'
                            value={loginData.user}
                            onChange={evt => setData(evt)}
                        />

                        <InputBlock
                            label='Senha'
                            id='password'
                            type='password'
                            value={loginData.password}
                            onChange={evt => setData(evt)}
                        />
                    </Fieldset>
                </Form>
            </Main>

            {isAuthenticated && <Redirect to='/' />}
        </Container>
    );
};

export default Login;
