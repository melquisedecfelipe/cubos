import React from 'react';

import { Input } from 'antd';

export default function InputComponent({ defaultValue, onBlur, placeholder, type }) {
  return (
    <Input defaultValue={defaultValue} onBlur={onBlur} placeholder={placeholder} type={type} />
  );
}
