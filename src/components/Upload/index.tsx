import React, {
    useState
} from 'react';
import Dropzone, {
    DropEvent
} from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
    FaLink,
    FaExclamationCircle,
    FaTimes
} from 'react-icons/fa';
import filesize from 'filesize';

import {
    Container,
    FileInfo,
    Preview,
    DropContainer,
    UploadMessage
} from './styles';

export interface ImageData {
    file: File;
    readableSize: string;
    previewURL: string;
    progress: number;
    error: boolean;
}

interface UploadProps {
    defaultMessage?: string;
    dragActiveMessage?: string;
    dragRejectMessage?: string;
    onDropAccepted: (files: ImageData) => void;
    image?: ImageData;
}

const Upload: React.FC<UploadProps> = ({ defaultMessage, dragActiveMessage, dragRejectMessage, onDropAccepted, image }) => {

    const [imageData, setImageData] = useState<ImageData>();
    const [renderCloseButton, setRenderCloseButton] = useState<boolean>(false);

    const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
        if (!isDragActive) {
            return <UploadMessage>{defaultMessage}</UploadMessage>;
        } else if (isDragReject) {
            return <UploadMessage type='error'>{dragRejectMessage}</UploadMessage>;
        }

        return <UploadMessage type='success'>{dragActiveMessage}</UploadMessage>;
    };

    const handleDrop = (files: File[], _: DropEvent) => {
        const file = files[0];

        const newImageData = {
            file,
            readableSize: filesize(file.size),
            previewURL: URL.createObjectURL(file),
            progress: image?.progress || 0,
            uploaded: false,
            error: false
        };

        setImageData(newImageData);

        onDropAccepted(newImageData);
    };

    const deleteImage = () => {
        setImageData(undefined);
    };

    if (imageData) {
        return (
            <Container
                onMouseEnter={() => setRenderCloseButton(true)}
                onMouseLeave={() => setRenderCloseButton(false)}
            >
                <FileInfo>
                    <Preview src={image?.previewURL} />

                    <div>
                        <strong>
                            {image?.file.name}
                            {renderCloseButton && (
                                <button
                                    onClick={deleteImage}
                                >
                                    <FaTimes
                                        size={16}
                                        color='var(--color-error)'
                                    />
                                </button>
                            )}
                        </strong>
                        <span>{image?.readableSize}</span>
                    </div>
                </FileInfo>

                <div>
                    {image?.previewURL && (
                        <a
                            href={image?.previewURL}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <FaLink
                                style={{ marginRight: '0.5rem' }}
                                size={32}
                                color='#222'
                            />
                        </a>
                    )}

                    {!image?.error && (
                        <CircularProgressbar
                            styles={{
                                root: {
                                    width: 36
                                },
                                path: {
                                    stroke: 'var(--color-primary)'
                                }
                            }}
                            strokeWidth={10}
                            value={image?.progress || 0}
                        />
                    )}

                    {image?.error && (
                        <FaExclamationCircle
                            style={{ marginLeft: '0.5rem' }}
                            size={32}
                            color='var(--color-error)'
                        />
                    )}
                </div>
            </Container>
        );
    } else {
        return (
            <Dropzone accept='image/*' onDropAccepted={handleDrop}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone>
        );
    }
};

export default Upload;
