import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components'
import Palette from '../../../../assets/palette';
import type { WeekProdutivity } from '..';

const Container = styled.div`
  height: 225px;
  width: 100%;
`;

interface BarChartProps {
  data: WeekProdutivity[],
}

export function Chart({
  data
}: BarChartProps) {
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'week');

  const colorMap = {
    'done': Palette.green,
    'overdue': Palette.red
  }

  const generateTicks = (step: number) => {
    const values: number[] = [];
    const ticks: number[] = [];

    data.forEach(
      (d) => {
        values.push(d['done'])
        values.push(d['overdue'])
      }
    );

    values.sort();

    for (let value = 0; value <= Math.max(...values); value += step) ticks.push(value);

    return ticks;
  }

  return (
    <Container className='tskr-line-chart'>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy='week'
        margin={{ top: 20, right: 40, bottom: 50, left: 50 }}
        padding={0.2}
        groupMode='grouped'
        layout='vertical'
        colors={({ id }) => colorMap[id as keyof typeof colorMap]}
        colorBy='id'
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 36,
        }}
        axisLeft={{
          tickValues: generateTicks(25),
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        theme={{
          tooltip: {
            container: {
              background: "#111827",
              color: Palette.white
            }
          },
          axis: {
            ticks: {
              text: {
                fill: Palette.white
              }
            },
            legend: {
              text: {
                fill: Palette.white
              }
            }
          },
          grid: {
            line: {
              stroke: Palette.details
            }
          },
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-left",
            direction: "row",
            translateY: -10,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 10,
            symbolShape: "circle",
          },
        ]}
        role="application"
        ariaLabel="Bar chart"
      />
    </Container>
  )
}