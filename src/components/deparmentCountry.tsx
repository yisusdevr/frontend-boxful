import React from 'react';
import { Select } from 'antd';
import { SelectOption, destinationTypes } from '../data/deparmentData';

const { Option } = Select;

interface deparmentCountryProps {
  onChange?: (value: string) => void;
  value?: string;
}

const deparmentCountry: React.FC<deparmentCountryProps> = ({ onChange, value }) => {
  return (
    <Select
    
      style={{ width: '100%', height: '50px' , fontFamily: 'var(--font-albert-sans)'
      }}
      placeholder="Ej: San Salvador"
      onChange={onChange}
      value={value}
      
    >
      {destinationTypes.map((option) => (
        <Option key={option.value} value={option.value} style={{ fontFamily: 'var(--font-albert-sans)'}}>
      
          {option.value}
        </Option>
      ))}
    </Select>
  );
};

export default deparmentCountry;