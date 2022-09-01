import { useState } from "react";
import { useTheme } from '@emotion/react';
import styled from "@emotion/styled";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StyledChartWrapper = styled.div`
  position: relative;
`;

const StyledChartHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  color: ${p => p.theme.colorLabel};
  letter-spacing: 1px;
  font-size: 14px;
`;

export default () => {
    const theme = useTheme();

    const [options, setOptions] = useState<any>({
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        grid: {
            yaxis: {
                lines: {
                    show: false
                }
            },
        },   
        stroke: {
            curve: "straight",
            colors: [theme.colorAccent]
        },
        colors: [theme.colorAccent],
        fill: {
            colors: ["#ffffff"],
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.4,
              opacityTo: 0,
              stops: [0, 100],
              gradientToColors: ["#ffffff", "#ffffff"]

            }
          },
        yaxis: { 
            show: false, 
            crosshairs: {
                show: false
            },
            axisBorder: {
                show: true,
            },
            max: 100,
        },
        xaxis: {
            labels: {
                style: {
                    colors: theme.colorDefault,
                    fontFamily: theme.fontPrimary
                }
            },
            crosshairs: {
                show: false
            },
            axisBorder: {
                color: theme.colorBorder,
            },
            axisTicks: {
                show: false
            },
            categories: ["", "1d", "1w", "1m", "3m", "6m", "1y", "All Time"],
            tooltip: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            style: {
                fontFamily: theme.fontPrimary,
                fontSize: 16
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                }
            },
        },
        markers: {
            enabled: false,
            strokeColors: theme.colorBackground,
            strokeWidth: 3,
            strokeOpacity: 1,
            size: 0,
            hover: {
                size: undefined,
                sizeOffset: 8
              }
        }
      })

    const [series, setSeries] = useState<any>([
        {
          name: "Earnings",
          data: [0, 40, 25, 60, 39, 80, 50, 100]
        }
      ])

    return (
        <StyledChartWrapper>
            <StyledChartHeader>
                NODE EARNINGS (USD)
            </StyledChartHeader>
            <Chart
                options={options}
                series={series}
                type="area"
                height="360px"
                width="100%"
            />
        </StyledChartWrapper>
    )
}