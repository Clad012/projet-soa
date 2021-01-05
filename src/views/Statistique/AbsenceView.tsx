import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Select } from "antd";
import LineChart from "../../components/Statistique/LineChart";
import PieChart from "../../components/Statistique/PieChart";

import { callApi } from "../../utils/api";
const { Option } = Select;
const AbsenceView: React.FC = () => {
  const [anneeScolaire, setAnneeScolaire] = useState("2020/2021");
  const [anneScolaireData, setAnneScolaireData] = useState([
    { critere: "", valeur: 0 },
  ]);
  const [absencesByClass, setAbsenceByClass] = useState([
    { critere: "", valeur: 0 },
  ]);
  const [absencesByDate, setAbsenceByDate] = useState([
    { critere: "", valeur: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  function onChange(value: string) {
    setAnneeScolaire(value);
    setLoading(true);
    callApi("get", "absences/statistiques/classe?anneeScolaire=" + value).then(
      (response: any) => {
        setAbsenceByClass(response);
      }
    );

    callApi("get", "absences/statistiques/date?anneeScolaire=" + value).then(
      (response: any) => {
        setAbsenceByDate(response);
        setLoading(false);
      }
    );
  }
  useEffect(() => {
    callApi("get", "absences/statistiques/anneeScolaire").then(
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
            title="Absences par année scolaire"
            data={anneScolaireData}
          />
        </Col>
        <Col xs={24} sm={12} md={12} className="mt-2">
          <PieChart
            data={absencesByClass}
            title={`Absences par classe pour l'année: ${anneeScolaire}`}
          />
        </Col>
        <Col xs={24} sm={24} md={24} className="mt-2">
          <LineChart
            data={absencesByDate}
            title={`Absences par date pour l'année: ${anneeScolaire}`}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AbsenceView;
