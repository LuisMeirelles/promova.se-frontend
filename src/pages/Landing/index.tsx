import React from 'react';

import {
    PageLanding,
    PageLandingContent,
    LogoContainer,
    Logo,
    Description,
    HeroImage,
    ButtonsContainer,
    Button,
    ButtonIcon
} from './styles';

import heroImage from '../../assets/img/hero-image.svg';
import loginIcon from '../../assets/img/login-icon.svg';
import signUpIcon from '../../assets/img/sign-up-icon.svg';

const Landing: React.FC = () => {
    return (
        <PageLanding>
            <PageLandingContent>
                <LogoContainer>
                    <Logo>Antares</Logo>
                    <Description>Plataforma para interação com a banda Antares</Description>
                </LogoContainer>

                <HeroImage src={heroImage} />

                <ButtonsContainer>
                    <Button to='/login' primary>
                        <ButtonIcon src={loginIcon} alt="Ícone de Login"/>
                        Fazer Login
                    </Button>

                    <Button to='/signup' secondary>
                        <ButtonIcon src={signUpIcon} alt="Ícone de Cadastro"/>
                        Cadastrar
                    </Button>
                </ButtonsContainer>
            </PageLandingContent>
        </PageLanding>
    );
}

export default Landing;
