import Head from 'next/head';
import { Inter } from '@next/font/google';
import React, { ChangeEvent, useState } from 'react';
import Chart from 'chart.js/auto';
import 'reflect-metadata';

const inter = Inter({ subsets: ['latin'] });

// 各軸の設定値
type selectValues = {
  x: string;
  y: string;
};

export default function Home(props: any) {
  // セレクタから各軸の変更を受け取る。
  const [selectValues, setSelectValues] = useState<selectValues>({ x: 'carbo', y: 'calories' });
  React.useEffect(() => {
    let cerealChart: Chart;
    const cereals = props.cereals.map((cereal: any) => {
      return { x: cereal[selectValues.x], y: cereal[selectValues.y] };
    });
    const config: any = {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: `${cereals.length} Cereals`,
            backgroundColor: 'rgb(255, 99, 132)',
            data: cereals,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: selectValues.x,
              font: {
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: selectValues.y,
              font: {
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    };
    cerealChart = new Chart(document.getElementById('cerealChart') as HTMLCanvasElement, config);
    return () => {
      cerealChart.destroy();
    };
  }, [selectValues]);

  // 軸のラベル一覧
  const options = [
    { label: 'calories' },
    { label: 'protein' },
    { label: 'fat' },
    { label: 'sodium' },
    { label: 'fiber' },
    { label: 'carbo' },
    { label: 'sugars' },
    { label: 'potass' },
    { label: 'vitamins' },
    { label: 'shelf' },
    { label: 'weight' },
    { label: 'cups' },
    { label: 'rating' },
  ];

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

  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name='description' content='Chart.jsで散布図を表示するアプリ' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <section style={{ padding: '10pt' }}>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          X軸: <Select options={options} defaultValue='carbo' onChange={handleSelectXChange} />
          <br />
          Y軸: <Select options={options} defaultValue='calories' onChange={handleSelectYChange} />
          <div style={{ width: '400pt' }}>
            <canvas id='cerealChart' width='300' height='300'></canvas>
          </div>
        </section>
      </main>
    </>
  );
}

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

/**
 * セレクトボックス
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
      {options.map((option) => (
        <option key={option.label}>{option.label}</option>
      ))}
    </select>
  );
}

export async function getServerSideProps(context: any) {
  const response = await fetch('http://localhost:3000/api/cereals');
  const cereals = await response.json();
  return {
    props: { cereals },
  };
}
