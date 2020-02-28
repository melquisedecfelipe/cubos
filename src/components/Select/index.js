import React, { memo } from 'react';

import './styles.scss';

function SelectComponent({ onChange, option, value, disabled }) {
  return (
    <select
      value={value ? value : undefined}
      onChange={onChange}
      disabled={disabled}
      className={disabled ? '-disabled' : ''}
    >
      <option value="">Filtrar por gênero</option>
      {option
        ? option.map(elem => (
            <option value={elem.id} key={elem.id}>
              {elem.name}
            </option>
          ))
        : null}
    </select>
  );
}

export default memo(SelectComponent);
