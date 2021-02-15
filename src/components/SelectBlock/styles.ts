import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    & + &
    & + #input-block {
        margin-top: 1rem;
    }

    &::after {
        width: 0;
        height: 3px;
        content: "";
        background-color: var(--color-primary-light);
        position: absolute;
        left: 0.96rem;
        right: 0.96rem;
        bottom: 0;
        transition: all 0.2s;
    }

    &:focus-within::after {
        width: calc(100% - 1.92rem);
        transition: all 0.2s;
    }
`;

export const Label = styled.label`
    font-size: 0.84rem;
    color: var(--color-text-complement);
`;

export const Select = styled.select`
    width: 100%;
    height: 3.36rem;
    border-radius: 0.48rem;
    padding: 0 0.96rem;
    border: 1px solid var(--color-line-in-primary);
    background: var(--color-input-background);
    cursor: pointer;

    &:focus {
        color: inherit;
        background: var(--color-input-background);
        border: 1px solid var(--color-line-in-primary);
    }
`;
