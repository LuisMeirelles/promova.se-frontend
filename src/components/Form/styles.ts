import styled from 'styled-components';

interface FooterProps {
    hasData: boolean;
}

export const Footer = styled.footer<FooterProps>`
    padding: 2.4rem 1.44rem;
    background-color: var(--color-box-footer);
    border-top: 1px solid var(--color-line-in-white);
    margin-top: 3.84rem;

    & > button {
        margin-top: ${({ hasData }) => hasData ? '1.92rem' : '0'};
    }

    @media (min-width: 1100px) {
        padding: 2.4rem 3.84rem;
        display: flex;
        align-items: center;
        justify-content: ${({ hasData }) => hasData ? 'space-between' : 'center'};

        & > button {
            margin-top: 0;
        }
    }
`;

export const WarningText = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.84rem;
    line-height: 1.44rem;
    color: var(--color-text-complement);

    @media (min-width: 1100px) {
        justify-content: space-between;
    }
`;

export const WarningIcon = styled.img`
    margin-right: 1.2rem;
    width: 32px;
    height: 32px;
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 3.36rem;
    background: var(--color-secondary);
    color: var(--color-button-text);
    border: 0;
    border-radius: 0.48rem;
    font-weight: bold;
    font-size: 0.96rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.2s;

    &:hover,
    &:focus {
        background-color: var(--color-secondary-dark);
    }

    @media (min-width: 1100px) {
        width: 12rem;
        cursor: pointer;
    }
`;
