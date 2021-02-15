import styled from 'styled-components';
import { Container as BSContainer } from "reactstrap";

export const Container = styled.header`
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary);
`;

export const TopBarContainer = styled(BSContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.96rem 0;
    color: var(--color-text-in-primary);
`;

export const ReturnButton = styled.div`
    height: 1.92rem;
    transition: all 0.2s;

    &:hover,
    &:focus-within {
        opacity: 0.6;
    }
`;

export const Logo = styled.p`
    margin-bottom: 0;
    font-family: 'Caveat', cursive;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-title-in-primary);
`;

export const HeaderContent = styled(BSContainer)`
    position: relative;
    margin-bottom: 3.84rem;

    @media (min-width: 1100px) {
        flex: 1 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        max-width: 1100px;
        margin-bottom: 0;
        padding-bottom: 3rem;
    }
`;

export const HeaderTitle = styled.strong`
    font-size: 2.16rem;
    line-height: 2.52rem;
    color: var(--color-title-in-primary);

    @media (min-width: 700px) {
        max-width: 350px;
    }
`;

export const HeaderDescription = styled.p`
    max-width: 18rem;
    font-size: 0.96rem;
    line-height: 1.56rem;
    margin-top: 0.96rem;
    color: var(--color-text-in-primary);
`;
