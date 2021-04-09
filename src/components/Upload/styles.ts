import styled, {
    css
} from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    color: var(--color-text-base);

    button {
        background: none;
        border: none;
        margin-left: 0.25rem;
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        strong {
            margin-bottom: 0;
        }

        span {
            font-size: 0.75rem;
            color: var(--color-text-complement);
        }
    }
`;

interface PreviewProps {
    src?: string;
}

export const Preview = styled.div<PreviewProps>`
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    background-image: url(${({ src }) => src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 1rem;
`;

interface DropContainerProps {
    isDragActive: boolean;
    isDragReject: boolean;
}

const dragActive = css`
    border-color: var(--color-secondary);
`;

const dragReject = css`
    border-color: var(--color-error);
`;

const hoverContainer = css`
    border-width: 2px;

    p {
        padding: calc(1rem - 1px) 0;
        font-weight: bold;
    }
`;

export const DropContainer = styled.div<DropContainerProps>`
    border: 1px dashed var(--color-primary);
    border-radius: 0.25rem;
    cursor: pointer;

    ${({ isDragActive }) => isDragActive && [dragActive, hoverContainer]}
    ${({ isDragReject }) => isDragReject && [dragReject, hoverContainer]}

    &:hover,
    &:focus {
        ${() => hoverContainer}
    }
`;

interface UploadMessageProps {
    type?: 'error' | 'success';
}

const messageColors = {
    default: 'var(--color-text-base)',
    error: 'var(--color-error)',
    success: 'var(--color-secondary)'
};

export const UploadMessage = styled.p<UploadMessageProps>`
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    margin-bottom: 0;
    color: ${({ type }) => messageColors[type || 'default']};
`;
