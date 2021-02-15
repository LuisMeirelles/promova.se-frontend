import React, {
    useState,
    FormEvent
} from 'react';

import { useHistory } from 'react-router-dom';

import {
    AddButtonContainer,
    Container,
    Main,
    AddButton,
    UploadContainer
} from './styles';

import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import Fieldset from '../../components/Fieldset';
import InputBlock from '../../components/InputBlock';
import SelectBlock from '../../components/SelectBlock';
import Upload from '../../components/Upload';

import api from '../../services/api';

interface ResponseMessage {
    type: 'success' | 'warning' | 'error' | '';
    message: string;
}

interface SignUpData {
    email: string;
    username: string;
    password: string;
}

interface BandData {
    name: string;
    profilePhoto?: string;
    bio?: string;
    members: string[];
    musicalStyles: string[];
    contact: {
        [otherContact: string]: string | undefined;
        phoneNumber?: string;
        email?: string;
    };
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
    };
}

const SignUp: React.FC = () => {
    const [signUpData, setSignUpData] = useState<SignUpData>({
        email: '',
        username: '',
        password: ''
    });

    const [bandData, setBandData] = useState<BandData>({
        name: '',
        members: [],
        musicalStyles: [],
        contact: {}
    });

    const [confirmedPassword, setConfirmedPassword] = useState<string>('');

    const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
        type: '',
        message: ''
    });

    const [formation, setFormation] = useState<string>('');

    const history = useHistory();

    const handleSignUp = async (evt: FormEvent) => {
        evt.preventDefault();

        if (signUpData.password === confirmedPassword) {
            try {
                await api.post(
                    '/users',
                    signUpData
                );

                history.push('/');
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

        console.log({ bandData, signUpData });
    };

    const emailIsValid = () => {
        const { email } = signUpData;

        if (/^[\w.-]+@\w+(\.\w+)+$/.test(email)) {
            return true;
        } else if (email === '') {
            return undefined;
        } else {
            return false;
        }
    };

    const generateInvalidEmailText = () => {
        const { email } = signUpData;
        const messages = [];

        const emailParts = email.split('@');

        if (email === '') {
            return [];
        }

        if (/\s/.test(email)) {
            messages.push('Não são permitidos espaços');
        }

        if (emailParts.length === 1) {
            messages.push('Insira um "@"');
        } else if (emailParts.length > 2) {
            messages.push('Um E-mail deve possuir apenas um "@"');
        } else {
            const [user, domain] = emailParts;

            if (domain === '') {
                messages.push('Insira um domínio após o "@"');
            }

            if (user === '') {
                messages.push('Insira um usuário antes do "@"');
            }

            if (/[^A-Za-z]$/.test(domain)) {
                messages.push('O domínio deve terminar com alguma letra');
            } else {
                const domainParts = domain.split('.');

                if (domainParts.length === 1) {
                    messages.push('O domínio deve conter duas partes separadas por "."');
                }
            }

        }

        return messages;
    };

    const usernameIsValid = () => {
        const { username } = signUpData;

        if (/[\s/]/.test(username)) {
            return false;
        } else if (username === '') {
            return undefined;
        } else {
            return true;
        }
    };

    const generateInvalidUsernameText = () => {
        const { username } = signUpData;
        const messages = [];

        if (/\s/.test(username)) {
            messages.push('O nome de usuário não pode conter espaços.');
        }

        if (/\//.test(username)) {
            messages.push('O nome de usuário não pode conter "/".');
        }

        return messages;
    };

    const passwordIsValid = () => {
        const { password } = signUpData;

        const regex = /(?=.*[<>,.;:/?°~^[\]{}ºª´`'"!@#$%&*()\-_=+|\\])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;

        if (regex.test(password)) {
            return true;
        } else if (password === '') {
            return undefined;
        } else {
            return false;
        }
    };

    const generateInvalidPasswordText = () => {
        const { password } = signUpData;
        const messages = [];

        if (password.length < 8) {
            messages.push('A senha deve ter pelo menos oito caracteres');
        }

        if (!/[a-z]+/.test(password)) {
            messages.push('A senha deve conter pelo menos uma letra minúscula');
        }

        if (!/[A-Z]+/.test(password)) {
            messages.push('A senha deve conter pelo menos uma letra maiúscula');
        }

        if (!/[0-9]+/.test(password)) {
            messages.push('A senha deve conter pelo menos um número');
        }

        if (!/[<>,.;:/?°~^[\]{}ºª´`'"!@#$%&*()\-_=+|\\]+/.test(password)) {
            messages.push('A senha deve conter pelo menos um dos seguintes caracteres especiais: <>,.;:/?°~^[]{}ºª´`\'"!@#$%&*()-_=+|\\');
        }

        return messages;
    };

    const confirmedPasswordIsValid = () => {
        const { password } = signUpData;

        const regex = /(?=.*[<>,.;:/?°~^[\]{}ºª´`'"!@#$%&*()\-_=+|\\])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;

        if (confirmedPassword === password && regex.test(confirmedPassword)) {
            return true;
        } else if (confirmedPassword === '') {
            return undefined;
        } else {
            return false;
        }
    };

    const generateInvalidConfirmedPasswordText = () => {
        const { password } = signUpData;
        const messages = [];

        if (confirmedPassword.length < 8) {
            messages.push('A senha deve ter pelo menos oito caracteres');
        }

        if (!/[a-z]+/.test(confirmedPassword)) {
            messages.push('A senha deve conter pelo menos uma letra minúscula');
        }

        if (!/[A-Z]+/.test(confirmedPassword)) {
            messages.push('A senha deve conter pelo menos uma letra maiúscula');
        }

        if (!/[0-9]+/.test(confirmedPassword)) {
            messages.push('A senha deve conter pelo menos um número');
        }

        if (!/[<>,.;:/?°~^[\]{}ºª´`'"!@#$%&*()\-_=+|\\]+/.test(confirmedPassword)) {
            messages.push('A senha deve conter pelo menos um dos seguintes caracteres especiais: <>,.;:/?°~^[]{}ºª´`\'"!@#$%&*()-_=+|\\');
        }

        if (confirmedPassword !== password) {
            messages.push('As senhas não coincidem');
        }

        return messages;
    };

    const addMember = () => {
        setBandData({
            ...bandData,
            members: [...bandData.members, '']
        });
    };

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
                    <Fieldset title='Dados da Conta'>
                        <InputBlock
                            autoFocus
                            label='E-mail'
                            type='email'
                            value={signUpData.email}
                            onChange={evt => setSignUpData({
                                ...signUpData,
                                email: evt.target.value
                            })}
                            valid={emailIsValid()}
                            messagesOnInvalid={generateInvalidEmailText()}
                        />

                        <InputBlock
                            label='Nome de Usuário'
                            value={signUpData.username}
                            onChange={evt => setSignUpData({
                                ...signUpData,
                                username: evt.target.value
                            })}
                            valid={usernameIsValid()}
                            messagesOnInvalid={generateInvalidUsernameText()}
                        />

                        <InputBlock
                            label='Senha'
                            type='password'
                            value={signUpData.password}
                            onChange={evt => setSignUpData({
                                ...signUpData,
                                password: evt.target.value
                            })}
                            valid={passwordIsValid()}
                            messagesOnInvalid={generateInvalidPasswordText()}
                        />

                        <InputBlock
                            label='Confirmar Senha'
                            type='password'
                            value={confirmedPassword}
                            onChange={evt => setConfirmedPassword(evt.target.value)}
                            valid={confirmedPasswordIsValid()}
                            messagesOnInvalid={generateInvalidConfirmedPasswordText()}
                        />
                    </Fieldset>

                    <Fieldset title='Dados da Banda'>
                        <InputBlock
                            label='Nome da Banda'
                            value={bandData.name}
                            onChange={evt => setBandData({
                                ...bandData,
                                name: evt.target.value
                            })}
                        />

                        <SelectBlock
                            label={`Informe a formação da ${bandData.name || 'banda'}`}
                            options={[
                                { value: 'solo', text: 'Solo' },
                                { value: 'dupla', text: 'Dupla' },
                                { value: 'banda', text: 'Banda' }
                            ]}
                            value={formation}
                            onChange={evt => {
                                setFormation(evt.target.value);

                                switch (evt.target.value) {
                                    case '':
                                        setBandData({
                                            ...bandData,
                                            members: []
                                        });

                                        break;

                                    case 'solo':
                                        setBandData({
                                            ...bandData,
                                            members: [
                                                ...bandData.members.slice(0, 1)
                                            ]
                                        });

                                        break;

                                    case 'dupla':
                                        setBandData({
                                            ...bandData,
                                            members: [
                                                ...bandData.members.slice(0, 2)
                                            ]
                                        });

                                        break;
                                }
                            }}
                        />

                        {((formation === 'solo' && bandData.members.length < 1) ||
                            (formation === 'dupla' && bandData.members.length < 2) ||
                            (formation === 'banda' && bandData.members.length < 3)) && addMember()}

                        {bandData.members.map((_, idx) => (formation !== '') && (
                            <>
                                <InputBlock
                                    label='Nome do Integrante'
                                    value={bandData.members[idx]}
                                    onChange={evt => setBandData({
                                        ...bandData,
                                        members: [
                                            ...bandData.members.slice(0, idx),
                                            evt.target.value,
                                            ...bandData.members.slice(idx + 1)
                                        ]
                                    })}
                                    closable={(formation === 'banda' && bandData.members.length > 3)}
                                    onClose={() => setBandData({
                                        ...bandData,
                                        members: [
                                            ...bandData.members.slice(0, idx),
                                            ...bandData.members.slice(idx + 1)
                                        ]
                                    })}
                                />
                            </>
                        ))}

                        {(Boolean(formation === 'banda') ||
                            Boolean(formation === 'dupla' && bandData.members.length === 1)) && (
                                <AddButtonContainer>
                                    <AddButton
                                        type='button'
                                        onClick={addMember}
                                    >
                                        +
                                    </AddButton>
                                </AddButtonContainer>
                            )
                        }

                        <UploadContainer>
                            <Upload
                                defaultMessage='Insira a foto de perfil da sua banda aqui...'
                                dragActiveMessage='Solte a foto aqui...'
                                dragRejectMessage='Arquivo não suportado'
                            />
                        </UploadContainer>
                    </Fieldset>
                </Form>
            </Main>
        </Container>
    );
};

export default SignUp;
