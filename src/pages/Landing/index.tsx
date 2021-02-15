import React from 'react';

import {
    PageLanding,
    PageLandingContent,
    LogoContainer,
    Logo,
    Description,
    HeroImage,
    ButtonsContainer,
    Button
} from './styles';

import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import heroImage from '../../assets/img/hero-image.svg';

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
                        <FaSignInAlt style={{ marginRight: '1rem' }} size={32} color='white' />
                        Fazer Login
                    </Button>

                    <Button to='/signup' secondary>
                        <FaUserPlus style={{ marginRight: '1rem' }} size={32} color='white' />
                        Cadastrar
                    </Button>
                </ButtonsContainer>
            </PageLandingContent>
        </PageLanding>
    );
};

export default Landing;
