import React, { memo } from 'react';

import { Select } from 'antd';

const { Option } = Select;

function SelectComponent({ onChange, option, value }) {
  return (
    <Select placeholder="Genero" value={value ? value : undefined} onChange={onChange}>
      <Option value="">Nenhum</Option>
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

export default memo(SelectComponent);
