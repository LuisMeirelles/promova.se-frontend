import React, {
    useState,
    FormEvent,
    useEffect
} from 'react';

import { useHistory } from 'react-router-dom';

import {
    Container,
    Main,
    UploadContainer,
    RadioContainer,
    Label,
    RadioWrapper
} from './styles';

import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import Fieldset from '../../components/Fieldset';
import InputBlock from '../../components/InputBlock';
import Upload, {
    ImageData
} from '../../components/Upload';

import BandRegister, {
    BandData
} from '../../components/BandRegister';

import ContractorRegister, {
    ContractorData
} from '../../components/ContractorRegister';

import api from '../../services/api';

interface ResponseMessage {
    type: 'success' | 'warning' | 'error' | '';
    message: string;
}

interface SignUpData {
    email: string;
    username: string;
    password: string;
    bio?: string;
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
    bandData?: BandData;
    contractorData?: ContractorData;
}

const SignUp: React.FC = () => {
    const [signUpData, setSignUpData] = useState<SignUpData>({
        email: '',
        username: '',
        password: '',
        contact: {}
    });

    const [profilePicture, setProfilePicture] = useState<ImageData>({
        file: new File([''], ''),
        readableSize: '',
        error: false,
        previewURL: '',
        progress: 0
    });

    const [passwordConfirmed, setPasswordConfirmed] = useState<string>('');

    const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
        type: '',
        message: ''
    });

    const [bandRegister, isBandRegister] = useState(true);

    const [validEmail, isValidEmail] = useState(false);
    const [validUsername, isValidUsername] = useState(false);
    const [validPassword, isValidPassword] = useState(false);

    const [validData, isValidData] = useState(false);

    const [bandData, setBandData] = useState<BandData>({
        name: '',
        formation: '',
        members: []
    });

    const [contractorData, setContractorData] = useState<ContractorData>({
        companyName: ''
    });

    const history = useHistory();

    useEffect(() => {
        if (validEmail && validUsername && validPassword) {
            isValidData(true);
        } else {
            isValidData(false);
        }
    }, [
        validEmail,
        validUsername,
        validPassword
    ]);

    useEffect(() => {
        if (bandRegister) {
            setContractorData({
                companyName: ''
            });
        } else {
            setBandData({
                formation: '',
                members: [],
                name: ''
            });
        }
    },[bandRegister]);

    const handleSignUp = async (evt: FormEvent) => {
        evt.preventDefault();

        const {
            email,
            username,
            password
        } = signUpData;

        if (email.trim() === '' || username.trim() === '' || password.trim() === '') {
            setResponseMessage({
                type: 'warning',
                message: 'Todos os campos devem ser preenchidos.'
            });
        } else if (validData) {
            const data = new FormData();

            data.append('email', email);
            data.append('username', username);
            data.append('password', password);
            data.append('profile_picture', profilePicture.file);

            data.append('band_name', bandData.name);
            data.append('band_formation', bandData.formation);
            data.append('members', JSON.stringify(bandData.members));

            try {
                await api.post('/users', data, {
                    onUploadProgress: (evt: ProgressEvent) => {
                        const progress = Math.round((evt.loaded * 100) / evt.total);

                        setProfilePicture({
                            ...profilePicture,
                            progress
                        });
                    }
                });

                history.push('/');
            } catch (error) {
                switch (error.response?.data.message) {
                    case 'unexpected error while creating new user':
                        setResponseMessage({
                            type: 'error',
                            message: 'Erro inesperado ao criar novo usuário.\nPor favor, contate o suporte.'
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
        } else if (!validEmail) {
            setResponseMessage({
                type: 'warning',
                message: 'O email é inválido'
            });
        } else if (!validUsername) {
            setResponseMessage({
                type: 'warning',
                message: 'O nome de usuário é inválido'
            });
        } else if (!validPassword && password.trim() !== '') {
            setResponseMessage({
                type: 'warning',
                message: 'A senha é inválida'
            });
        }
    };

    const emailIsValid = () => {
        const { email } = signUpData;

        if (/^[\w.-]+@\w+(\.\w+)+$/.test(email)) {
            !validEmail && isValidEmail(true);
            return true;
        } else if (email === '') {
            return undefined;
        } else {
            validEmail && isValidEmail(false);
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
            validUsername && isValidUsername(false);
            return false;
        } else if (username === '') {
            return undefined;
        } else {
            !validUsername && isValidUsername(true);
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
            if (!validPassword && passwordConfirmed === password) {
                isValidPassword(true);
            }

            return true;
        } else if (password === '') {
            return undefined;
        } else {
            validPassword && isValidPassword(false);
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

        if (passwordConfirmed === password && regex.test(passwordConfirmed)) {
            return true;
        } else if (passwordConfirmed === '') {
            return undefined;
        } else {
            return false;
        }
    };

    const generateInvalidConfirmedPasswordText = () => {
        const { password } = signUpData;
        const messages = [];

        if (passwordConfirmed.length < 8) {
            messages.push('A senha deve ter pelo menos oito caracteres');
        }

        if (!/[a-z]+/.test(passwordConfirmed)) {
            messages.push('A senha deve conter pelo menos uma letra minúscula');
        }

        if (!/[A-Z]+/.test(passwordConfirmed)) {
            messages.push('A senha deve conter pelo menos uma letra maiúscula');
        }

        if (!/[0-9]+/.test(passwordConfirmed)) {
            messages.push('A senha deve conter pelo menos um número');
        }

        if (!/[<>,.;:/?°~^[\]{}ºª´`'"!@#$%&*()\-_=+|\\]+/.test(passwordConfirmed)) {
            messages.push('A senha deve conter pelo menos um dos seguintes caracteres especiais: <>,.;:/?°~^[]{}ºª´`\'"!@#$%&*()-_=+|\\');
        }

        if (passwordConfirmed !== password) {
            messages.push('As senhas não coincidem');
        }

        return messages;
    };

    return (
        <Container>
            <PageHeader
                title='Cadastre sua banda ou estabelecimento aqui.'
                description='Para realizar o cadastro da sua banda ou estabelecimento na nossa plataforma basta preencher os dados do formulário abaixo.'
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
                            value={passwordConfirmed}
                            onChange={evt => setPasswordConfirmed(evt.target.value)}
                            valid={confirmedPasswordIsValid()}
                            messagesOnInvalid={generateInvalidConfirmedPasswordText()}
                        />

                        <UploadContainer>
                            <Upload
                                defaultMessage='Insira a foto de perfil aqui...'
                                dragActiveMessage='Solte a foto aqui...'
                                dragRejectMessage='Arquivo não suportado'
                                onDropAccepted={profilePicture => {
                                    setProfilePicture(profilePicture);
                                }}
                                image={profilePicture}
                            />
                        </UploadContainer>

                        <RadioContainer
                            onKeyPress={evt => {
                                const target = evt.target as HTMLInputElement;

                                if (evt.key === 'Enter' || evt.key === ' ') {
                                    const input = target.previousElementSibling as HTMLInputElement;

                                    input.checked = true;

                                    isBandRegister(input.id === 'band-radio');

                                    evt.preventDefault();
                                }
                            }}
                        >
                            <Label htmlFor='band-radio'>Você quer cadastrar que tipo de conta?</Label>

                            <RadioWrapper>
                                <input
                                    defaultChecked
                                    type='radio'
                                    name='radio'
                                    id='band-radio'
                                    onChange={() => isBandRegister(true)}
                                />

                                <Label
                                    tabIndex={0}
                                    htmlFor='band-radio'
                                    onKeyDown={evt => {
                                        if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
                                            const target = evt.target as HTMLInputElement;
                                            const firstDiv = target.parentElement as HTMLInputElement;
                                            const secondDiv = firstDiv.nextElementSibling as HTMLInputElement;
                                            const label = secondDiv.children[1] as HTMLInputElement;

                                            label.focus();
                                            evt.preventDefault();
                                        }
                                    }}
                                >
                                    Banda/Dupla/Solo
                                </Label>
                            </RadioWrapper>

                            <RadioWrapper>
                                <input
                                    type='radio'
                                    name='radio'
                                    id='contractor-radio'
                                    onChange={() => isBandRegister(false)}
                                />

                                <Label
                                    tabIndex={0}
                                    htmlFor='contractor-radio'
                                    onKeyDown={evt => {
                                        if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
                                            const target = evt.target as HTMLInputElement;
                                            const firstDiv = target.parentElement as HTMLInputElement;
                                            const secondDiv = firstDiv.previousElementSibling as HTMLInputElement;
                                            const label = secondDiv.children[1] as HTMLInputElement;

                                            label.focus();
                                            evt.preventDefault();
                                        }
                                    }}
                                >
                                    Contratante
                                </Label>
                            </RadioWrapper>
                        </RadioContainer>
                    </Fieldset>

                    {bandRegister ? (
                        <BandRegister
                            onBandDataUpdate={(bandData: BandData) => {
                                setBandData(bandData);
                            }}
                        />
                    ) : (
                        <ContractorRegister
                            onContractorDataUpdate={(contractorData: ContractorData) => {
                                setContractorData(contractorData);
                            }}
                        />
                    )}
                </Form>
            </Main>
        </Container>
    );
};

export default SignUp;
