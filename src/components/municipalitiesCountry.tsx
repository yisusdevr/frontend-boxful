import React from 'react';
import { Select } from 'antd';
import {  destinationTypes } from '../data/municipalitiesData';

const { Option } = Select;

interface municipalitiesCountryProps {
  onChange?: (value: string) => void;
  value?: string;
}

const municipalitiesCountry: React.FC<municipalitiesCountryProps> = ({ onChange, value }) => {
  return (
    <Select
    
      style={{ width: '100%', height: '50px' , fontFamily: 'var(--font-albert-sans)'}}
      placeholder="Ej: Mejicanos"
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

export default municipalitiesCountry;