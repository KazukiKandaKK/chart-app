import Head from 'next/head';
import { Select } from 'src/components/selector';
import { Dictionary } from 'src/types/common';

// 画面にレンダリングするHTML
const ChartView = (handles: Dictionary<any>, options: Dictionary<any>) => {
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
          X軸: <Select options={options.axis} defaultValue='carbo' onChange={handles.x} />
          <br />
          Y軸: <Select options={options.axis} defaultValue='calories' onChange={handles.y} />
          <br />
          mfr: <Select options={options.mfr} defaultValue='All' onChange={handles.mfr} />
          <br />
          type: <Select options={options.type} defaultValue='All' onChange={handles.type} />
          <div style={{ width: '400pt' }}>
            <canvas id='cerealChart' width='300' height='300'></canvas>
          </div>
        </section>
      </main>
    </>
  );
};

export default ChartView;
