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

export const UploadContainer = styled.div`
    margin: 2rem 0;

    &:hover {
        margin: 1.5rem 0;

        & p {
            padding: 1.5rem 0;
        }
    }

    &:focus-within {
        margin: 1.5rem 0;

        & p {
            padding: 1.5rem 0;
        }
    }
`;
