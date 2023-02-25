import React, { ChangeEvent, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
};

/**
 * セレクタのコンポーネント
 * @param
 * @returns
 */
export function Select({ options, defaultValue, onChange }: SelectProps) {
  const [value, setValue] = useState(defaultValue || '');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
