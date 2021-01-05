import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Select } from "antd";
import LineChart from "../../components/Statistique/LineChart";
import PieChart from "../../components/Statistique/PieChart";
import Ranking from "../../components/Statistique/Ranking";

import { callApi } from "../../utils/api";
const { Option } = Select;
const ResultatView: React.FC = () => {
  const [anneeScolaire, setAnneeScolaire] = useState("2020/2021");
  const [anneScolaireData, setAnneScolaireData] = useState([
    { critere: "", valeur: 0 },
  ]);
  const [resultatsByClass, setResultatByClass] = useState([
    { critere: "", valeur: 0 },
  ]);
  const [resultatsBySexe, setResultatBySexe] = useState([
    { critere: "", valeur: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [topEtudiants, setTopEtudiants] = useState<any>([]);

  function onChange(value: string) {
    setAnneeScolaire(value);
    setLoading(true);
    callApi("get", "resultats/statistiques/classe?anneeScolaire=" + value).then(
      (response: any) => {
        setResultatByClass(response);
      }
    );

    callApi("get", "resultats/statistiques/sexe?anneeScolaire=" + value).then(
      (response: any) => {
        setResultatBySexe(response);
      }
    );
    callApi("get", "resultats/statistiques/top10?anneeScolaire=" + value).then(
      (response: any) => {
        setTopEtudiants(response);

        setLoading(false);
      }
    );
  }
  useEffect(() => {
    callApi("get", "resultats/statistiques/anneeScolaire").then(
      (response: any) => {
        setAnneScolaireData(response);
      }
    );
    onChange("2020/2021");
  }, []);
  return (
    <div>
      <h4>Séléctionner une année scolaire</h4>
      <Select
        defaultValue="2020/2021"
        style={{ width: 200, marginBottom: "20px" }}
        placeholder="Selectionner une année scolaire"
        onChange={onChange}
        loading={loading}
      >
        <Option value="2019/2020">2019/2020</Option>
        <Option value="2020/2021">2020/2021</Option>
        <Option value="2021/2022">2021/2022</Option>
        <Option value="2022/2023">2022/2023</Option>
        <Option value="2023/2024">2023/2024</Option>
      </Select>
      <Row gutter={12}>
        <Col xs={24} sm={12} md={12} className="mt-2">
          <LineChart
            title="Etudiants qui ont réussi par année scolaire"
            data={anneScolaireData}
          />
        </Col>
        <Col xs={24} sm={12} md={12} className="mt-2">
          <PieChart
            data={resultatsByClass}
            title={`Etudiants qui ont réussi par classe pour l'année: ${anneeScolaire}`}
          />
        </Col>
        <Col xs={24} sm={12} md={12} className="mt-2">
          <PieChart
            data={resultatsBySexe}
            title={`Etudiants qui ont réussi par sexe pour l'année: ${anneeScolaire}`}
          />
        </Col>
        <Col xs={24} sm={12} md={12} className="mt-2">
          <Ranking
            data={topEtudiants}
            title={`Classement des étudiants (TOP 10) pour l'année: ${anneeScolaire}`}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ResultatView;
