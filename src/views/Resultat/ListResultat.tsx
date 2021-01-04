import React, { useState } from "react";
import ResultatList from "../../components/Resultat/ResultatList";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";

import ResultatForm from "../../components/Resultat/ResultatForm";
import { Resultat } from "../../store/resultats/types";

const ListResultat: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResultat, setSelectedResultat] = useState<Resultat>();
  const [title, setTitle] = useState("");

  const onRequestFinished = (type: string, message: string) => {
    notification.open({
      message: type,
      description: message,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    setIsModalVisible(false);
  };
  const showModal = (create: boolean) => {
    if (create) {
      setTitle("Ajouter un nouveau resultat");
      setSelectedResultat(undefined);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectResultat = (resultat: Resultat) => {
    setSelectedResultat(resultat);
    setTitle("Modifier resultat");
    showModal(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Gestion des resultats</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal(true)}
            icon={<UserAddOutlined />}
          >
            Ajouter un nouveau resultat
          </Button>
        </Col>
      </Row>
      <Card>
        <ResultatList
          selectResultat={selectResultat}
          onRequestFinished={onRequestFinished}
        />
      </Card>
      <ResultatForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedResultat={selectedResultat}
      />
    </div>
  );
};
export default ListResultat;
