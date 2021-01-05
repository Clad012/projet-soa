import React, { useRef } from "react";
import { Card } from "antd";
import { Pie } from "@ant-design/charts";

interface StatisticCardProps {
  title: string;
  subTitle?: string;
  data?: any;
}
const PieChart: React.FC<StatisticCardProps> = ({ title, data }) => {
  const config = {
    data,
    height: 300,
    meta: {
      critere: {
        alias: "Critere",
        range: [0, 1],
      },
      valeur: {
        alias: "Valeur",
        formatter: (v: any) => {
          return v;
        },
      },
    },
    angleField: "valeur",
    colorField: "critere",
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
          <Pie {...config} chartRef={ref} />
        </div>
      </Card>
    </div>
  );
};
export default PieChart;
