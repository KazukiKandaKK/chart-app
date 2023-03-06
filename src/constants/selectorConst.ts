// TODO: 動的に取得できるようにする。
// セレクタのX軸、Y軸の選択肢
export const selectorInfo = [
  { value: 'calories', label: 'calories' },
  { value: 'protein', label: 'protein' },
  { value: 'fat', label: 'fat' },
  { value: 'sodium', label: 'sodium' },
  { value: 'fiber', label: 'fiber' },
  { value: 'carbo', label: 'carbo' },
  { value: 'sugars', label: 'sugars' },
  { value: 'potass', label: 'potass' },
  { value: 'vitamins', label: 'vitamins' },
  { value: 'shelf', label: 'shelf' },
  { value: 'weight', label: 'weight' },
  { value: 'cups', label: 'cups' },
  { value: 'rating', label: 'rating' },
];

// シリアルのメーカ(mfr)の選択肢
export const filteredMfrInfo = [
  { value: 'All', label: 'All' },
  { value: 'N', label: 'N' },
  { value: 'Q', label: 'Q' },
  { value: 'K', label: 'K' },
  { value: 'R', label: 'R' },
  { value: 'G', label: 'G' },
  { value: 'P', label: 'P' },
  { value: 'A', label: 'A' },
];

// シリアルの温度(Hot or Cold)の選択肢
export const filteredTypeInfo = [
  { value: 'All', label: 'All' },
  { value: 'C', label: 'C' },
  { value: 'H', label: 'H' },
];
