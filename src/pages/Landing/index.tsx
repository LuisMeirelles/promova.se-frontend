import React from 'react';
import {
    FaSignInAlt,
    FaUserPlus
} from 'react-icons/fa';

import {
    PageLanding,
    PageLandingContent,
    LogoContainer,
    Description,
    HeroImageWrapper,
    ButtonsContainer,
    Button
} from './styles';

import Logo from '../../assets/components/Logo';
import HeroImage from '../../assets/components/HeroImage';

const Landing: React.FC = () => {
    return (
        <PageLanding>
            <PageLandingContent>
                <LogoContainer>
                    <Logo />
                    <Description>Plataforma para promover sua banda ou encontrar bandas para tocar no seu estabelecimento.</Description>
                </LogoContainer>

                <HeroImageWrapper>
                    <HeroImage />
                </HeroImageWrapper>

                <ButtonsContainer>
                    <Button to='/entrar' color='primary'>
                        <FaSignInAlt style={{ marginRight: '1rem' }} size={32} color='white' />
                        Fazer Login
                    </Button>

                    <Button to='/registrar' color='secondary'>
                        <FaUserPlus style={{ marginRight: '1rem' }} size={32} color='white' />
                        Cadastrar
                    </Button>
                </ButtonsContainer>
            </PageLandingContent>
        </PageLanding>
    );
};

export default Landing;
