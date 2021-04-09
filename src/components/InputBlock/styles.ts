import styled from 'styled-components';
import {
    Input as BootstrapInput
} from 'reactstrap';

interface ContainerProps {
    closable?: boolean;
}

export const Container = styled.div<ContainerProps>`
    position: relative;

    & + &,
    #select-block + & {
        margin-top: 1rem;
    }

    &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 3px;
        border-radius: 3px;
        left: 0.96rem;
        bottom: 0;
        background-color: var(--color-primary-light);
        transition: all 0.2s;
    }

    &:focus-within::after {
        width: ${({ closable }) => closable ? 'calc(100% - 5.52rem)' : 'calc(100% - 1.92rem)'};
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.48rem;
`;

export const Label = styled.label`
    font-size: 0.84rem;
    color: var(--color-text-complement);
`;

export const Input = styled(BootstrapInput)`
    width: 100%;
    height: 3.36rem;
    border-radius: 0.48rem;
    padding: 0 0.96rem;
    border: 1px solid var(--color-line-in-primary);
    background: var(--color-input-background);

    &&:focus {
        box-shadow: none;
        color: inherit;
        background: var(--color-input-background);
        border: 1px solid var(--color-line-in-primary);
    }
`;
