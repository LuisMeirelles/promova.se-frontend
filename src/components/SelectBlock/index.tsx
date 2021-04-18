import React, {
    SelectHTMLAttributes
} from 'react';

import {
    Container,
    Label,
    Select
} from './styles';

interface SelectBlockProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: {
        value: string;
        text: string;
    }[];
}

const SelectBlock: React.FC<SelectBlockProps> = ({ label, id, options, ...props }) => {
    id = !id ? Date.now().toString() : id;

    return (
        <Container className="select-block">
            <Label htmlFor={id}>{label}</Label>

            <Select
                id={id}
                {...props}
            >
                <option value=''>Selecione uma opção...</option>

                {options.map(({ value, text }, idx) => (
                    <option value={value} key={idx}>
                        {text}
                    </option>
                ))}
            </Select>
        </Container>
    );
};

export default SelectBlock;
