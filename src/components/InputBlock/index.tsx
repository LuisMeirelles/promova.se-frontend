import React, { InputHTMLAttributes } from 'react';

import {
    Container,
    Label,
    Input
} from './styles';

interface InputBlockProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
}

const InputBlock: React.FC<InputBlockProps> = ({ label, type, id, ...props }) => {
    return (
        <Container>
            <Label htmlFor={id || undefined}>{label}</Label>
            <Input type={type || 'text'} id={id} {...props} />

        </Container>
    );
}

export default InputBlock;
