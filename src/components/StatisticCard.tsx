import React, { useRef } from "react";
import { Card } from "antd";
import { Line } from "@ant-design/charts";

interface StatisticCardProps {
  title: string;
  subTitle?: string;
  data?: [];
}
const StatisticCard: React.FC<StatisticCardProps> = ({ title }) => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    responsive: true,
    height: 100,
    autoFit: true,
    xField: "year",
    yField: "value",
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
      <Card title={title} bordered={false} className="maxHeight">
        <div>
          <Line {...config} chartRef={ref} />
        </div>
      </Card>
    </div>
  );
};
export default StatisticCard;
