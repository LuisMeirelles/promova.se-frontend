import styled from 'styled-components';

import { HeroImageProps } from './index';

export const Svg = styled.svg<HeroImageProps>`
    width: ${({ size }) => size || '100%'};
    height: fit-content;
`;
