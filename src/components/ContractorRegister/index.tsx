import React, {
    useState,
    useEffect
} from 'react';

import Fieldset from '../Fieldset';
import InputBlock from '../InputBlock';

interface ContractorRegisterProps {
    onContractorDataUpdate: (contractorData: ContractorData) => void;
}

export interface ContractorData {
    companyName: string;
}

const ContractorRegister: React.FC<ContractorRegisterProps> = ({ onContractorDataUpdate }) => {

    const [contractorData, setContractorData] = useState<ContractorData>({
        companyName: ''
    });

    useEffect(() => {
        onContractorDataUpdate(contractorData);
    }, [
        contractorData,
        onContractorDataUpdate
    ]);

    return (
        <Fieldset title='Dados do Contratante'>
            <InputBlock
                label='Nome do Estabelecimento'
                autoCapitalize='words'
                value={contractorData.companyName}
                onChange={evt => setContractorData({
                    ...contractorData,
                    companyName: evt.target.value
                })}
            />
        </Fieldset>
    );
};

export default ContractorRegister;
