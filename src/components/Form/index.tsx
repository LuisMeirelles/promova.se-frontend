import React, { FormHTMLAttributes } from 'react';

import {
    Footer,
    WarningText,
    WarningIcon,
    SubmitButton
} from './styles';

import errorIcon from '../../assets/img/error-icon.svg';
import warningIcon from '../../assets/img/warning-icon.svg';
import successIcon from '../../assets/img/success-icon.svg';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    buttonText: string;
    footerMessage: {
        type: string;
        message: string;
    };
}

const Form: React.FC<FormProps> = ({ footerMessage, buttonText, children, ...props }) => {
    let footerIcon;

    switch (footerMessage.type) {
        case 'error':
            footerIcon = errorIcon;
            break;

        case 'warning':
            footerIcon = warningIcon;
            break;

        case 'success':
            footerIcon = successIcon;
    }

    return (
        <form {...props}>
            {children}

            <Footer hasData={Boolean(footerMessage.message)}>
                {
                    footerMessage.message &&
                    <WarningText>
                        <WarningIcon src={footerIcon} alt='ícone de aviso importante' />

                        {footerMessage.type === 'warning' && 'Atenção'}
                        {footerMessage.type === 'error' && 'Erro'}
                        {footerMessage.type === 'success' && 'Sucesso'}
                        <br />
                        {footerMessage.message}
                    </WarningText>
                }

                <SubmitButton type='submit'>{buttonText}</SubmitButton>
            </Footer>
        </form>
    );
}

export default Form;
