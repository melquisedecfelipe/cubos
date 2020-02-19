import React, { memo } from 'react';

import { Input } from 'antd';

function InputComponent({ defaultValue, onBlur }) {
  return <Input placeholder="Nome" type="text" value={defaultValue} onChange={onBlur} />;
}

export default memo(InputComponent);
