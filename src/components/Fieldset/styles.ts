import styled from 'styled-components';

export const Container = styled.fieldset`
    border: 0;
    padding: 0 1.44rem;

    @media (min-width: 1100px) {
        padding: 0 3.84rem;
    }
`;

export const FieldsetTitle = styled.legend`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.96rem;
    border-bottom: 1px solid var(--color-line-in-white);
    font-weight: bold;
    font-size: 1.44rem;
    color: var(--color-text-title);
`;
