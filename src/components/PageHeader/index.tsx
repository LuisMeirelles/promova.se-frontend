import React from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    TopBarContainer,
    ReturnButton,
    Logo,
    HeaderContent,
    HeaderTitle,
    HeaderDescription
} from './styles';

import returnIcon from '../../assets/img/return-icon.svg';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
    return (
        <Container>
            <TopBarContainer>
                <ReturnButton>
                    <Link to='/'>
                        <img src={returnIcon} alt="Voltar" />
                    </Link>
                </ReturnButton>

                <Logo>Antares</Logo>
            </TopBarContainer>

            <HeaderContent>
                <HeaderTitle>{title}</HeaderTitle>
                {description && <HeaderDescription>{description}</HeaderDescription>}

                {children}
            </HeaderContent>
        </Container>
    );
}

export default PageHeader;
