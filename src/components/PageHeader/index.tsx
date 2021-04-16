import React from 'react';
import { Link } from 'react-router-dom';

import {
    Wrapper,
    Container,
    TopBarContainer,
    ReturnButton,
    HeaderContent,
    HeaderTitle,
    HeaderDescription
} from './styles';

import Logo from '../../assets/components/Logo';

import returnIcon from '../../assets/svg/return-icon.svg';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
    return (
        <Wrapper>
            <Container>
                <TopBarContainer>
                    <ReturnButton>
                        <Link to='/'>
                            <img src={returnIcon} alt="Voltar" />
                        </Link>
                    </ReturnButton>

                    <Logo size='20%' />
                </TopBarContainer>

                <HeaderContent>
                    <HeaderTitle>{title}</HeaderTitle>
                    {description && <HeaderDescription>{description}</HeaderDescription>}

                    {children}
                </HeaderContent>
            </Container>
        </Wrapper>
    );
}

export default PageHeader;
