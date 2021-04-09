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

export const RadioContainer = styled.div`
    margin-top: 1rem;
`;

export const Label = styled.label`
    font-size: 0.84rem;
    width: fit-content;
    color: var(--color-text-complement);
`;

export const RadioWrapper = styled.div`
    label {
        display: flex;
        align-items: center;
        margin-left: 2rem;
        position: relative;

        &::before {
            content: "";
            display: flex;
            align-items: center;
            justify-content: center;
            left: -2rem;
            width: 1rem;
            height: 1rem;
            font-size: 2rem;
            border: 2px solid var(--color-text-complement);
            border-radius: 50%;
            margin: 0 0.5rem;
            position: absolute;
        }

        &::after {
            content: "";
            position: absolute;
            width: 0;
            height: 3px;
            bottom: 0;
            border-radius: 3px;
            background-color: var(--color-primary-light);
            transition: all 0.2s;
        }

        &:hover,
        &:focus {
            &::before {
                border-color: rgba(156, 152, 166, 0.75);
            }

            &::after {
                width: 100%;
            }
        }
    }

    input[type=radio] {
        display: none;

        &:checked {
            & + label::before {
                content: "\u2022";
                color: var(--color-primary);
            }
        }
    }
`;

export const UploadContainer = styled.div`
    margin: 2.75rem 0;

    &:hover {
        border-width: 2px;
    }
`;
