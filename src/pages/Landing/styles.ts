import styled from 'styled-components';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

interface ButtonProps {
    color?: 'primary' | 'secondary';
}

export const PageLanding = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-in-primary);
    background-color: var(--color-primary);
`;

export const PageLandingContent = styled(Container)`
    @media (min-width: 1100px) {
        display: grid;
        grid-template-rows: 350px 1fr;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-areas:
            "logo hero hero"
            "buttons buttons buttons";
    }
`;

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (min-width: 1100px) {
        grid-area: logo;
        align-self: center;
        text-align: left;
        margin: 0;
    }
`;

export const Description = styled.h2`
    font-size: 1.44rem;
    line-height: 2.16rem;
    margin-bottom: 0;

    @media (min-width: 1100px) {
        text-align: left;
        text-align: initial;
        font-size: 1.92rem;
    }
`;

export const HeroImageWrapper = styled.div`
    display: flex;
    margin: 2.56rem 0;

    @media (min-width: 1100px) {
        margin: 0;
        grid-area: hero;
        justify-self: center;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;

    @media (min-width: 1100px) {
        flex-direction: row;
        grid-area: buttons;
        justify-content: flex-start;
    }
`;

const colors = {
    primary: 'var(--color-primary-lighter)',
    secondary: 'var(--color-secondary)'
};

const focusColors = {
    primary: 'var(--color-primary-light)',
    secondary: 'var(--color-secondary-dark)'
}

export const Button = styled(Link)<ButtonProps>`
    width: 100%;
    padding: 0.5rem;
    border-radius:0.48rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--color-button-text);
    transition: all 0.2s;

    background-color: ${({ color }) => color ? colors[color] : 'white'};

    &:first-of-type {
        margin-bottom: 0.96rem;
    }

    &:hover,
    &:focus {
        text-decoration: none;
        color: var(--color-button-text);
        background-color: ${({ color }) => color ? focusColors[color]: '#ccc'};
    }

    @media (min-width: 1100px) {
        width: fit-content;
        padding: 1.15rem 3.65rem;
        font-size: 1.44rem;

        &:first-of-type {
            margin-right: 0.96rem;
            margin-bottom: 0;
        }
    }
`;
