import styled from 'styled-components';

import { LogoProps } from './index';

export const Svg = styled.svg<LogoProps>`
    width: ${({ size }) => size || '100%'};
    height: fit-content;
`;
