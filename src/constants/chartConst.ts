import { selectValues } from 'src/types/chart';

// チャートに描画する設定値
export const chartInfo = (cereals: any, selectValues: selectValues) => {
  return {
    // グラフの描画方法
    type: 'scatter',
    // データに係る設定
    data: {
      datasets: [
        {
          label: `${cereals.length} Cereals`, // サンプル総数
          backgroundColor: 'rgb(255, 99, 132)',
          data: cereals,
        },
      ],
    },
    // 描画のオプション
    options: {
      plugins: {
        legend: {
          position: 'bottom', // 凡例の位置
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
};
