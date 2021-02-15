import styled from 'styled-components';

export const Button = styled.button`
    margin-left: 1rem;
    font-size: 1.7rem;
    padding: 0.375rem 0.75rem;
    line-height: 1.96rem;
    text-align: center;
    vertical-align: middle;
    color: var(--danger);
    background: none;
    border: none;
    transition: all 0.2s;

    &:hover,
    &:focus {
        color: var(--color-error-dark);
    }
`;

