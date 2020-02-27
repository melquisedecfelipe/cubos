import React, { memo } from 'react';

import './styles.scss';

function InputComponent({ defaultValue, onBlur, disabled }) {
  return (
    <input
      placeholder="Nome"
      type="text"
      value={defaultValue}
      onChange={onBlur}
      disabled={disabled}
      className={disabled ? '-disabled' : ''}
    />
  );
}

export default memo(InputComponent);
