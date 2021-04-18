import React, {
    useState,
    FormEvent,
    ChangeEvent,
    useContext
} from 'react';
import { useHistory } from 'react-router-dom';

import {
    Container,
    Main
} from './styles';

import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import Fieldset from '../../components/Fieldset';
import InputBlock from '../../components/InputBlock';

import { Context } from '../../components/AuthProvider';

const Login: React.FC = () => {
    const { authenticated, authenticationHandler } = useContext(Context);

    const history = useHistory();

    const [loginData, setLoginData] = useState({
        user: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState({
        type: '',
        message: ''
    });

    const handleLogin = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        try {
            await authenticationHandler(loginData);

            history.push('/');
        } catch (error) {
            switch (error.response.data.message) {
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
                        message: `Erro inesperado ao autenticar o usuário.\nPor favor, contate o suporte.`
                    });

                    console.error(error.response.data);

                    break;

                default:
                    setResponseMessage({
                        type: 'error',
                        message: `Erro fatal.\nContate o suporte`
                    });

                    console.error(error.response.data);
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

    if (authenticated) {
        history.push('/');

        return <></>
    } else {
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
            </Container>
        );
    };
};

export default Login;
