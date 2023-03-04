import { Inter } from '@next/font/google';
import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import 'reflect-metadata';
import { selectorInfo, filteredMfrInfo, filteredTypeInfo } from 'src/constants/selectorConst';
import { chartInfo } from 'src/constants/chartConst';
import { Select } from 'src/components/selector';
import { selectValues } from 'src/types/chart';
import ChartView from 'src/layouts/chart';
import { Dictionary } from 'src/types/common';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  // セレクタから各軸の変更を受け取る。
  const [selectValues, setSelectValues] = useState<selectValues>({
    x: 'carbo',
    y: 'calories',
    mfr: 'All',
    type: 'All',
  });
  React.useEffect(() => {
    let cerealChart: Chart;

    const cereals = props.cereals
      .filter((cereal: any) => {
        const mfr = selectValues.mfr !== 'All' ? cereal['mfr'] === selectValues.mfr : true;
        const type = selectValues.type !== 'All' ? cereal['type'] === selectValues.type : true;
        return mfr && type;
      })
      .map((cereal: any) => {
        return { x: cereal[selectValues.x], y: cereal[selectValues.y] };
      });

    const config = chartInfo(cereals, selectValues);
    cerealChart = new Chart(document.getElementById('cerealChart') as HTMLCanvasElement, config);
    return () => {
      cerealChart.destroy();
    };
  }, [selectValues]);

  // 軸のラベル一覧
  const options: Dictionary<any> = {
    axis: selectorInfo,
    mfr: filteredMfrInfo,
    type: filteredTypeInfo,
  };

  // X軸の反映
  const handleSelectXChange = (value: string) => {
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      x: value,
    }));
  };

  // Y軸の反映
  const handleSelectYChange = (value: string) => {
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      y: value,
    }));
  };

  // Mfrの反映
  const handleSelectMfrChange = (value: string) => {
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      mfr: value,
    }));
  };

  // Typeの反映
  const handleSelectTypeChange = (value: string) => {
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      type: value,
    }));
  };

  const handles: Dictionary<any> = {
    x: handleSelectXChange,
    y: handleSelectYChange,
    mfr: handleSelectMfrChange,
    type: handleSelectTypeChange,
  };

  return ChartView(handles, options);
}

export async function getServerSideProps(context: any) {
  const response = await fetch('http://localhost:3000/api/v1/cereals');
  const cereals = await response.json();
  return {
    props: { cereals },
  };
}
