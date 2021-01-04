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
    { critere: "1991", nombre: 3 },
    { critere: "1992", nombre: 4 },
    { critere: "1993", nombre: 3.5 },
    { critere: "1994", nombre: 5 },
    { critere: "1995", nombre: 4.9 },
    { critere: "1996", nombre: 6 },
    { critere: "1997", nombre: 7 },
    { critere: "1998", nombre: 9 },
    { critere: "1999", nombre: 13 },
  ];

  const config = {
    data,
    responsive: true,
    height: 100,
    autoFit: true,
    xField: "critere",
    yField: "nombre",
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
