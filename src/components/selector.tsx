import React, { ChangeEvent, useState } from 'react';
import { SelectProps } from 'src/types/selector';
import ErrorBoundary from './errorBoundary';

/**
 * セレクトボックスのコンポーネント
 */
export function Select({ options, defaultValue, onChange }: SelectProps) {
  const [value, setValue] = useState(defaultValue || '');

  // セレクトボックスの変更時
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <ErrorBoundary>
      <select value={value} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </ErrorBoundary>
  );
}
