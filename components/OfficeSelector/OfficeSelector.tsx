import React, { FunctionComponent, useState, useEffect } from 'react';
import { Select } from 'react-native-ui-kitten';
import { useService } from 'contexts/ServicesContext';
import { Office } from 'types';

type OfficeSelectorProps = {
    onSelect: (office: Office) => void;
    value: Office;
    label?: string;
};

const OfficeSelector: FunctionComponent<OfficeSelectorProps> = ({
    onSelect,
    value,
    label
}) => {
    const [offices, setOffices] = useState([]);
    const { dataService } = useService();

    useEffect(() => {
        const unsubscribe = dataService.loadOffices(setOffices);

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Select
            data={offices.map(({ name }) => ({ text: name }))}
            onSelect={option => {
                onSelect(offices.find(({ name }) => name === option.text));
            }}
            label={label}
            selectedOption={value && { text: value.name }}
        />
    );
};

export default OfficeSelector;
