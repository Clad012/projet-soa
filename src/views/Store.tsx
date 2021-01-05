import React from "react";
import { Row, Col, Card, Image } from "antd";
import LineChart from "../components/Statistique/LineChart";

const Store: React.FC = () => {
  const statisticCards = [
    { title: "Something" },
    { title: "yes" },
    { title: "tyes" },
    { title: "olala" },
  ];
  const renderCards = statisticCards.map((obj) => (
    <Col xs={24} sm={12} md={6}>
      <LineChart title={obj.title} />
    </Col>
  ));

  return (
    <div>
      <Row gutter={12}>{renderCards}</Row>
      <Row>
        <Col xs={24} style={{ marginTop: 12 }}>
          <Card>
            <Row justify="center">
              <Col>
                <Image
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }} justify="center">
              <Col xs={24} sm={12} md={12}>
                <div>
                  <strong>Nom du boutique:</strong> Ok
                </div>
                <div>
                  <strong>:</strong> Ok
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <strong>Slogan:</strong> Ok
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Store;
