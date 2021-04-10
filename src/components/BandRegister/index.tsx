import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import _ from 'lodash';

import {
    AddButtonContainer,
    AddButton
} from './styles';

import Fieldset from '../Fieldset';
import InputBlock from '../InputBlock';
import SelectBlock from '../SelectBlock';

interface BandRegisterProps {
    onBandDataUpdate: (bandData: BandData) => void;
}

export interface BandData {
    name: string;
    formation: string;
    members: string[];
}

const BandRegister: React.FC<BandRegisterProps> = ({ onBandDataUpdate }) => {

    const [bandData, setBandData] = useState<BandData>({
        name: '',
        formation: '',
        members: []
    });

    const usePrevious = <T extends {}>(value: T) => {
        const ref = useRef(value);

        useEffect(() => {
            ref.current = value;
        }, [value]);

        return ref.current;
    };

    const previousBandData = usePrevious(bandData);

    useEffect(() => {
        if (!_.isEqual(bandData, previousBandData)) {
            switch (bandData.formation) {
                case '':
                    setBandData({
                        ...bandData,
                        members: []
                    });

                    break;

                case 'solo':
                    setBandData({
                        ...bandData,
                        members: [
                            ...bandData.members.slice(0, 1)
                        ]
                    });

                    break;

                case 'dupla':
                    setBandData({
                        ...bandData,
                        members: [
                            ...bandData.members.slice(0, 2)
                        ]
                    });

                    break;
            }
        }
    }, [bandData, previousBandData]);

    const addMember = () => {
        setBandData({
            ...bandData,
            members: [...bandData.members, '']
        });
    };

    useEffect(() => {
        onBandDataUpdate(bandData);
    }, [
        bandData,
        onBandDataUpdate
    ]);

    return (
        <Fieldset title='Dados da Banda'>
            <InputBlock
                label='Nome da Banda'
                value={bandData.name}
                onChange={evt => setBandData({
                    ...bandData,
                    name: evt.target.value
                })}
            />

            <SelectBlock
                label={`Informe a formação da ${bandData.name || 'banda'}`}
                options={[
                    { value: 'solo', text: 'Solo' },
                    { value: 'dupla', text: 'Dupla' },
                    { value: 'banda', text: 'Banda' }
                ]}
                value={bandData.formation}
                onChange={evt => {
                    setBandData({
                        ...bandData,
                        formation: evt.target.value
                    });
                }}
            />

            {((bandData.formation === 'solo' && bandData.members.length < 1) ||
                (bandData.formation === 'dupla' && bandData.members.length < 2) ||
                (bandData.formation === 'banda' && bandData.members.length < 3)) && addMember()}

            {bandData.members.map((_, idx) => (bandData.formation !== '') && (
                <InputBlock
                    key={idx}
                    label='Nome do Integrante'
                    value={bandData.members[idx]}
                    onChange={evt => setBandData({
                        ...bandData,
                        members: [
                            ...bandData.members.slice(0, idx),
                            evt.target.value,
                            ...bandData.members.slice(idx + 1)
                        ]
                    })}
                    closable={(bandData.formation === 'banda' && bandData.members.length > 3)}
                    onClose={() => setBandData({
                        ...bandData,
                        members: [
                            ...bandData.members.slice(0, idx),
                            ...bandData.members.slice(idx + 1)
                        ]
                    })}
                />
            ))}

            {bandData.formation === 'banda' && (
                <AddButtonContainer>
                    <AddButton
                        type='button'
                        onClick={addMember}
                    >
                        +
                        </AddButton>
                </AddButtonContainer>
            )}
        </Fieldset>
    );
};

export default BandRegister;
