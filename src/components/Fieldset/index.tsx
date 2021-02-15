import React from 'react';

import {
    Container,
    FieldsetTitle
} from './styles';

interface FieldsetProps {
    title: string
}

const Fieldset: React.FC<FieldsetProps> = ({ title, children, ...props }) => {
    return (
        <Container {...props}>
            <FieldsetTitle>{title}</FieldsetTitle>

            {children}
        </Container>
    );
}

export default Fieldset;
