import React, {
    InputHTMLAttributes,
    Fragment
} from 'react';
import { FormFeedback } from 'reactstrap';

import {
    Container,
    InputWrapper,
    Label,
    Input
} from './styles';

import CloseButton from '../CloseButton';

export interface InputBlockProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    valid?: boolean;
    messagesOnValid?: string[];
    messagesOnInvalid?: string[];
    closable?: boolean;
    onClose?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const InputBlock: React.FC<InputBlockProps> = ({ label, id, valid, messagesOnValid, messagesOnInvalid, closable, onClose, ...props }) => {
    id = !id ? Date.now().toString() : id;

    return (
        <Container closable={closable} id="input-block">
            <Label htmlFor={id}>{label}</Label>

            {closable ? (
                <InputWrapper>
                    <Input id={id} {...props} valid={valid} invalid={valid !== undefined && !valid} />

                    <CloseButton onClick={onClose} />
                </InputWrapper>
            ) : (
                    <Input id={id} {...props} valid={valid} invalid={valid !== undefined && !valid} />
                )}

            <FormFeedback valid tooltip={messagesOnValid !== undefined}>
                {messagesOnValid?.map((message, idx, arr) => {
                    if (arr[idx + 1]) {
                        return (
                            <Fragment key={idx}>
                                {message}
                                <br />
                            </Fragment>
                        );
                    } else {
                        return (
                            <Fragment key={idx}>
                                {message}
                            </Fragment>
                        );
                    }
                })}
            </FormFeedback>

            <FormFeedback tooltip={messagesOnInvalid !== undefined}>
                {messagesOnInvalid?.map((message, idx, arr) => {
                    if (arr[idx + 1]) {
                        return (
                            <Fragment key={idx}>
                                {message}
                                <br />
                            </Fragment>
                        );
                    } else {
                        return (
                            <Fragment key={idx}>
                                {message}
                            </Fragment>
                        );
                    }
                })}
            </FormFeedback>
        </Container>
    );
};

export default InputBlock;
