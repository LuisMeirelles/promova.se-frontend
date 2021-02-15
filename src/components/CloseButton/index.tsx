import React, {
    ButtonHTMLAttributes
} from 'react';

import { Button } from './styles';

const CloseButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({type, ...props }) => {
    return (
        <Button
            type={type || 'button'}
            {...props}
        >
            &times;
        </Button>
    );
};

export default CloseButton;
