import React, {
    useState,
    FormEvent
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

const SignUp: React.FC = () => {
    interface ResponseMessage {
        type: 'success' | 'warning' | 'error' | '';
        message: string;
    }

    const [signUpData, setSignUpData] = useState({
        email: '',
        username: '',
        name: '',
        password: ''
    });

    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
        type: '',
        message: ''
    });

    const [isRegistered, setIsRegistered] = useState(false);

    async function handleSignUp(evt: FormEvent) {
        evt.preventDefault();

        if (signUpData.password === passwordConfirmed) {
            try {
                await api.post(
                    '/users',
                    signUpData
                );

                setIsRegistered(true);
            } catch (error) {
                switch (error.response?.data.message) {
                    case 'unexpected error while creating new user':
                        setResponseMessage({
                            type: 'error',
                            message: `Erro inesperado ao criar novo usuário.\nPor favor, contate o suporte provendo as seguintes informações: ${error.response.data.message.error}`
                        });

                        break;

                    case 'email already registered':
                        setResponseMessage({
                            type: 'warning',
                            message: 'O email informado já está em uso'
                        });

                        break;

                    case 'username already registered':
                        setResponseMessage({
                            type: 'warning',
                            message: 'O nome de usuário informado já está em uso'
                        });

                        break;
                }
            }
        } else {
            setResponseMessage({
                type: 'warning',
                message: 'As senhas não coincidem'
            });
        }
    }

    return (
        <Container>
            <PageHeader
                title='Nós da banda Antares ficamos agradecidos por você querer fazer parte das nossas decisões.'
                description='Para participar das decisões da banda é só realizar o cadastro preenchendo os dados do formulário abaixo.'
            />

            <Main>
                <Form
                    buttonText='Cadastrar-se'
                    onSubmit={handleSignUp}
                    footerMessage={responseMessage}
                >
                    <Fieldset title='Cadastro'>
                        <InputBlock
                            label='E-mail'
                            type='email'
                            value={signUpData.email}
                            onChange={evt => setSignUpData({ ...signUpData, email: evt.target.value })}
                        />

                        <InputBlock
                            label='Nome de Usuário'
                            value={signUpData.username}
                            onChange={evt => setSignUpData({ ...signUpData, username: evt.target.value })}
                        />

                        <InputBlock
                            label='Nome Real'
                            value={signUpData.name}
                            onChange={evt => setSignUpData({ ...signUpData, name: evt.target.value })}
                        />

                        <InputBlock
                            label='Senha'
                            type='password'
                            value={signUpData.password}
                            onChange={evt => setSignUpData({ ...signUpData, password: evt.target.value })}
                        />

                        <InputBlock
                            label='Confirmar Senha'
                            type='password'
                            value={passwordConfirmed}
                            onChange={evt => setPasswordConfirmed(evt.target.value)}
                        />
                    </Fieldset>
                </Form>
            </Main>

            {isRegistered && <Redirect to='/' />}
        </Container>
    );
};

export default SignUp;
