export type Option = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: Option[];
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
};
