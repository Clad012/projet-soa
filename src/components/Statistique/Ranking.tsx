import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Progress } from "antd";

interface StatisticCardProps {
  title: string;
  subTitle?: string;
  data?: any;
}

const Ranking: React.FC<StatisticCardProps> = ({ title, data }) => {
  const [topRank, setTopRank] = useState<any>(<div></div>);
  useEffect(() => {
    const elements = data.map((item: any, i: number) => (
      <li key={i} className="rankItem">
        <span className="rank">{i + 1}</span>

        <span className="rankStudent">
          {item.etudiant ? item.etudiant.prenom + " " + item.etudiant.nom : ""}
        </span>
        <span className="rateHolder">
          <span className="rankRate">{item.moyenne}/20</span>
          <span style={{ width: "100px", display: "inline-block" }}>
            <Progress percent={(item.moyenne / 20) * 100} size="small" />
          </span>
        </span>
      </li>
    ));
    setTopRank(elements);
  }, [data]);

  return (
    <div>
      <Card title={title} bordered={false}>
        <div>{topRank}</div>
      </Card>
    </div>
  );
};
export default Ranking;
