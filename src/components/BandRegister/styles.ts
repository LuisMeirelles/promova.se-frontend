import styled from 'styled-components';

export const AddButtonContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;

export const AddButton = styled.button`
    justify-content: center;
    background: none;
    border: none;
    font-size: 3rem;
    color: var(--color-secondary);

    &:hover,
    &:focus {
        color: var(--color-secondary-dark);
    }
`;
