import React, {
    useState
} from 'react';

import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
    FaLink,
    FaCheckCircle,
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

import api from '../../services/api';

interface UploadProps {
    defaultMessage?: string;
    dragActiveMessage?: string;
    dragRejectMessage?: string;
}

const Upload: React.FC<UploadProps> = ({ defaultMessage, dragActiveMessage, dragRejectMessage }) => {
    interface IImageData {
        file: File;
        readableSize: string;
        previewURL: string;
        progress: number;
        uploaded: boolean;
        error: boolean;
        url: string | null;
    }

    const [imageData, setImageData] = useState<IImageData>();
    const [renderCloseButton, setRenderCloseButton] = useState<boolean>(false);

    const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
        if (!isDragActive) {
            return <UploadMessage>{defaultMessage}</UploadMessage>;
        } else if (isDragReject) {
            return <UploadMessage type='error'>{dragRejectMessage}</UploadMessage>;
        }

        return <UploadMessage type='success'>{dragActiveMessage}</UploadMessage>;
    };

    const handleDrop = async (files: File[]) => {
        const file = files[0];

        const newImageData = {
            file,
            readableSize: filesize(file.size),
            previewURL: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        };

        const data = new FormData();

        setImageData(newImageData);

        data.append('file', newImageData.file);

        try {
            const response = await api.post('/upload', data, {
                onUploadProgress: (evt: ProgressEvent) => {
                    const progress = Math.round((evt.loaded * 100) / evt.total);
                    setImageData({
                        ...newImageData,
                        progress
                    });
                }
            });

            setImageData({
                ...newImageData,
                uploaded: true,
                url: response.data.url
            });

            console.log(response);
        } catch (err) {
            setImageData({
                ...newImageData,
                error: true
            });

            console.error(err);
        }
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
                    <Preview src={imageData.previewURL} />

                    <div>
                        <strong>
                            {imageData.file.name}
                        </strong>
                        <span>{imageData.readableSize}</span>
                    </div>
                </FileInfo>

                <div>
                    {!imageData.uploaded && !imageData.error && (
                        <CircularProgressbar
                            styles={{
                                root: {
                                    width: 24
                                },
                                path: {
                                    stroke: 'var(--color-primary)'
                                }
                            }}
                            strokeWidth={10}
                            value={imageData.progress}
                        />
                    )}

                    {imageData.url && (
                        <a
                            href={imageData.file.name}
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

                    {(imageData.uploaded) && (

                        renderCloseButton
                            ? (
                                <button
                                    onClick={deleteImage}
                                >
                                    <FaTimes
                                        size={32}
                                        color='var(--color-error)'
                                    />
                                </button>
                            ) : (
                                <FaCheckCircle
                                    size={32}
                                    color='var(--color-secondary)'
                                />
                            )
                    )}
                    {imageData.error && (
                        renderCloseButton
                            ? (
                                <button
                                    onClick={deleteImage}
                                >
                                    <FaTimes
                                        size={32}
                                        color='var(--color-error)'
                                    />
                                </button>
                            ) : (
                                <FaExclamationCircle
                                    size={32}
                                    color='var(--color-error)'
                                />
                            )
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
