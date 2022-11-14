import { styles } from './HostCharts.styles';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { mockCpu, mockDiskSpace, mockMemory } from './mockChartData';

const charts = [
  {
    name: 'CPU USAGE',
    series: mockCpu,
    value: 62,
    color: '#e9a34d',
    total: '/ 100',
    suffix: '%',
  },
  {
    name: 'MEMORY',
    series: mockMemory,
    value: 1.3,
    color: '#79db4a',
    total: '/ 7.9',
    suffix: ' GB',
  },
  {
    name: 'DISK SPACE',
    series: mockDiskSpace,
    value: 70.6,
    color: '#79db4a',
    total: '/ 128.0',
    suffix: ' GB',
  },
];

const options = {
  chart: {},
  grid: {
    padding: {
      left: -40,
      right: -40,
      top: 0,
      bottom: 0,
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '74%',
      },
      dataLabels: {
        show: false,
      },
      track: {
        background: '#4c4f4d',
      },
    },
  },
};

export const HostCharts = () => {
  return (
    <div css={styles.wrapper}>
      {charts.map((chart, idx) => (
        <div key={idx} css={styles.block}>
          <Chart
            width="120px"
            height="120px"
            type="radialBar"
            options={{
              ...options,
              colors: [chart.color],
            }}
            series={chart.series}
          />
          <div>
            <div>
              <label css={styles.label}>{chart.name}</label>
              <div css={styles.value} style={{ color: chart.color }}>
                {chart.value}
                {chart.suffix}
              </div>
              <div css={styles.total}>
                {chart.total}
                {chart.suffix}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
