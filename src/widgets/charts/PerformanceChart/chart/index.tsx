import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import Palette from '../../../../assets/palette';
import type { MemberPerformance } from '..';
import { useEffect } from 'react';

const Container = styled.div`
  height: 225px;
  width: 100%;
`;

interface LineChartProps {
  values: MemberPerformance[],
  lineColor:string
}

export function LineChart({
  lineColor,
  values
}: LineChartProps) {
  useEffect(() =>{
    console.log(values);
  },[])

  return (
    <Container className='tskr-line-chart'>
      <ResponsiveLine
        data={values}
        margin={{ top: 20, right: 40, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0.5, max: 24, stacked: false }}
        curve="linear"
        colors={lineColor}
        lineWidth={2}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableArea={false}
        enableSlices="x"
        useMesh={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: "",
          tickValues: ["week 1", "week 2", "week 3", "week 4", "week 5", "week 6", "week 7", "week 8"],
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          tickValues: [0.5, 1, 6, 12, 18, 24],
          format: v => `${v}h`,
          legend: "",
          legendOffset: -40,
        }}
        gridXValues={[]}
        gridYValues={[0.5, 1, 6, 12, 18, 24]}
        theme={{
          background: Palette.transparent,
          text: {
            fontFamily: 'Poppins',
            fill: Palette.white
          },
          tooltip: {
            container: {
              background: "#111827",
              color: "#fff",
            },
          },
          grid: {
            line: {
              stroke: Palette.details,
              strokeWidth: 1,
            },
          },
        }}
        legends={[
          {
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -10,
            itemsSpacing: 10,
            itemDirection: "left-to-right",
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 10,
            symbolShape: "circle",
          },
        ]}
        enablePoints={true}
      />
    </Container>
  )
}