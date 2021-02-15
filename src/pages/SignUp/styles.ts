import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
`;

export const Main = styled.main`
    width: 100%;
    max-width: 44.4rem;
    border-radius: 0.48rem;
    margin: -1.92rem auto 1.92rem;
    padding-top: 3.84rem;
    overflow: hidden;
    background-color: var(--color-box-base);
`;

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
    margin: 1rem 0;
`;
