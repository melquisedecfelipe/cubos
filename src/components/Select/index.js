import React from 'react';

import { Select } from 'antd';

const { Option } = Select;

export default function SelectComponent({ onChange, option, placeholder, value }) {
  return (
    <Select placeholder={placeholder} value={value} onChange={onChange}>
      {option
        ? option.map(elem => (
            <Option value={elem.id} key={elem.id}>
              {elem.name}
            </Option>
          ))
        : null}
    </Select>
  );
}
