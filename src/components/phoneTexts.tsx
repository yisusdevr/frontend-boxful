
'use client';

import React, { useState } from 'react';
import { Select, Input, Space, Form } from 'antd';
import { countries } from '@/data/countriesData'; 
import styles from '../app/styles/PhoneNumberSelector.module.css'; 

const { Option } = Select;

interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

interface PhoneNumberSelectorProps {

}

const PhoneNumberSelector: React.FC<PhoneNumberSelectorProps> = () => {
  const [form] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[2]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (value: string) => {
    const country = countries.find(c => c.code === value);
    if (country) {
      setSelectedCountry(country);
      form.setFieldValue('phone', country.prefix + phoneNumber);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    form.setFieldValue('phone', selectedCountry.prefix + value);
  };

  return (
    <div className={styles.phoneSelectorContainer}> 
      <Space.Compact style={{ width: '100%', padding: '0px' }}>
        <Select
          showSearch
          style={{ width: 70 }}
          placeholder=""
          optionFilterProp="children"
          onChange={handleCountryChange}
          value={selectedCountry?.code}
          filterOption={(input, option) => {
            const label = typeof option?.label === 'string' ? option.label : '';
            return label.toLowerCase().includes(input.toLowerCase());
          }}
          className={styles.countrySelect}
        >
          {countries.map((country) => (
            <Option key={country.code} value={country.code} label={country.name}>
              <span style={{ marginRight: '8px' }}>{country.flag}</span>{country.name} ({country.prefix})
            </Option>
          ))}
        </Select>

        <Form.Item
          name="phone"
          style={{ margin: 0, width: '33%' }}
        >
          <Input
            name="phone"
            placeholder="Número de teléfono"
            value={phoneNumber}
            onChange={handlePhoneChange}
            prefix={selectedCountry?.prefix}
            className={styles.phoneInput}
          />
        </Form.Item>
      </Space.Compact>
    </div>
  );
};

export default PhoneNumberSelector;