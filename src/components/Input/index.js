import React, { memo } from 'react';

import './styles.scss';

function InputComponent({ defaultValue, onBlur }) {
  return <input placeholder="Nome" type="text" value={defaultValue} onChange={onBlur} />;
}

export default memo(InputComponent);
