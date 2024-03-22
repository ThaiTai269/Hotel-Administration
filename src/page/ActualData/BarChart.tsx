import React from "react";
import { BarStackHorizontal } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "@visx/vendor/d3-time-format";
import { LegendOrdinal } from "@visx/legend";
import { IDataActual, IDataBar } from "../../interface/IActualData";

type TooltipData = {
  bar: SeriesPoint<any>;
  key: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

type BarStackHorizontalProps = {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data: IDataActual[];
};

const purple1 = "#6c5efb";
const purple2 = "#c998ff";
const purple3 = "#a44afe";
const background = "#eaedff";
const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };
const tooltipStyles = {
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
const formatDate = (date: string) => format(parseDate(date) as Date);

const keys = ["TotalRevenue"]; // The keys you want to visualize

// scales

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [purple1, purple2, purple3],
});

let tooltipTimeout: number;

const BarChart: React.FC<BarStackHorizontalProps> = ({
  width = 500,
  height = 300,
  events = false,
  margin = defaultMargin,
  data,
}: BarStackHorizontalProps) => {
  const hotelNames = data.map((d) => d.HotelName);
  const totalRevenues = data.map((d) => d.TotalRevenue);
  const hotelNameScale = scaleBand<string>({
    domain: hotelNames,
    padding: 0.3,
  });

  const totalRevenueScale = scaleLinear<number>({
    domain: [0, Math.max(...totalRevenues)],
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  hotelNameScale.rangeRound([0, yMax]);
  totalRevenueScale.rangeRound([0, xMax]);

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal<any, string>
            data={data}
            keys={keys}
            height={height}
            y={(d) => d.HotelName}
            x0={(d) => totalRevenueScale(0)}
            x1={(d) => totalRevenueScale(d[1])}
            color={colorScale}
            yScale={hotelNameScale}
            xScale={totalRevenueScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {}, 300);
                    }}
                    onMouseMove={() => {}}
                  />
                ))
              )
            }
          </BarStackHorizontal>
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={hotelNameScale}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={{
              fill: purple3,
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            }}
          />
          <AxisBottom
            top={yMax}
            scale={totalRevenueScale}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={{
              fill: purple3,
              fontSize: 11,
              textAnchor: "middle",
            }}
          />
        </Group>
      </svg>
      <div
        style={{
          position: "absolute",
          top: margin.top / 2 - 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div>
    </div>
  );
};

export default BarChart;
