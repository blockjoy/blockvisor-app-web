import styled from '@emotion/styled';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { mockCpu, mockDiskSpace, mockMemory } from './mockChartData';

const StyledWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 20px;
  display: none;

  @media only screen and (min-width: ${(p) => p.theme.screenSm}) {
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: ${(p) => p.theme.screenLg}) {
    min-height: 122px;
  }
`;

const StyledLabel = styled.div`
  letter-spacing: 1px;
  font-size: 12px;
  color: ${(p) => p.theme.colorDefault};
`;

const StyledValue = styled.div`
  font-size: 28px;
  margin-top: 10px;
  margin-bottom: 4px;
`;

const StyledTotal = styled.div`
  color: ${(p) => p.theme.colorLabel};
  font-size: 12px;
`;

const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media only screen and (min-width: ${(p) => p.theme.screenSm}) {
    text-align: left;
    flex-direction: row;
  }
`;

const charts = [
  {
    name: 'CPU USAGE',
    series: mockCpu,
    value: 62,
    color: '#e9a34d',
    total: '/ 100%',
    suffix: '%',
  },
  {
    name: 'MEMORY',
    series: mockMemory,
    value: 1.3,
    color: '#79db4a',
    total: '/7.9',
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
    <StyledWrapper>
      {charts.map((chart) => (
        <StyledBlock>
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
            <StyledLabel>{chart.name}</StyledLabel>
            <StyledValue style={{ color: chart.color }}>
              {chart.value}
              {chart.suffix}
            </StyledValue>
            <StyledTotal>
              {chart.total}
              {chart.suffix}
            </StyledTotal>
          </div>
        </StyledBlock>
      ))}
    </StyledWrapper>
  );
};
