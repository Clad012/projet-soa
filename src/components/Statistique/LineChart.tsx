import React, { useRef } from "react";
import { Card } from "antd";
import { Line } from "@ant-design/charts";

interface StatisticCardProps {
  title: string;
  subTitle?: string;
  data?: any;
}
const LineChart: React.FC<StatisticCardProps> = ({ title, data }) => {
  const config = {
    data,
    responsive: true,
    height: 300,
    autoFit: true,
    xField: "critere",
    yField: "valeur",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  const ref = useRef();

  //   const downloadImage = () => {
  //     ref.current?.downloadImage();
  //   };

  //   const toDataURL = () => {
  //     console.log(ref.current?.toDataURL());
  //   };
  return (
    <div>
      <Card title={title} bordered={false}>
        <div>
          <Line {...config} chartRef={ref} />
        </div>
      </Card>
    </div>
  );
};
export default LineChart;
