import Head from 'next/head';
import { Inter } from '@next/font/google';
import React from 'react';
import Chart from 'chart.js/auto';
import Cereals from 'src/entity/cereals.entity';
import 'reflect-metadata';
import connection from 'src/db/connection';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  React.useEffect(() => {
    let cerealChart: Chart;
    const cereals = props.cereals.map((cereal: any) => {
      return { x: cereal.calories, y: cereal.carbo };
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
              text: 'Calories',
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
              text: 'Carbo',
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
  }, []);
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
          <div style={{ width: '400pt' }}>
            <canvas id='cerealChart' width='300' height='300'></canvas>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const conn = await connection();
  const _cereals = await conn.getRepository(Cereals).find();
  const cereals = JSON.parse(JSON.stringify(_cereals));
  return {
    props: { cereals },
  };
}
