import React, { memo } from 'react';

import './styles.scss';

function InputComponent({ defaultValue, onBlur, disabled }) {
  return (
    <input
      placeholder="Filtrar por nome"
      type="text"
      value={defaultValue}
      onChange={onBlur}
      disabled={disabled}
      className={disabled ? '-disabled' : ''}
    />
  );
}

export default memo(InputComponent);
