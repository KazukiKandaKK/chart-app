import Head from 'next/head';
import { Inter } from '@next/font/google';
import React, { ChangeEvent, useState } from 'react';
import Chart from 'chart.js/auto';
import 'reflect-metadata';
import { selectorInfo } from 'src/constants/selectorInfo';
import { chartInfo } from 'src/constants/chartInfo';
import { Select } from 'src/components/selector';

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
    const config = chartInfo(cereals, selectValues);
    cerealChart = new Chart(document.getElementById('cerealChart') as HTMLCanvasElement, config);
    return () => {
      cerealChart.destroy();
    };
  }, [selectValues]);

  // 軸のラベル一覧
  const options = selectorInfo;

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

export async function getServerSideProps(context: any) {
  const response = await fetch('http://localhost:3000/api/cereals');
  const cereals = await response.json();
  return {
    props: { cereals },
  };
}
