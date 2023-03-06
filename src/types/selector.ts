// セレクトボックスの選択肢
export type Option = {
  value: string;
  label: string;
};

// Selecコンポーネントのインターフェース
export type SelectProps = {
  options: Option[];
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
};
