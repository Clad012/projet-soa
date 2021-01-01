import React, { useState } from "react";
import EnseignantList from "../../components/Enseignant/EnseignantList";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";

import EnseignantForm from "../../components/Enseignant/EnseignantForm";
import { Enseignant } from "../../store/enseignants/types";

const ListEnseignant: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState<Enseignant>();
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
      setTitle("Ajouter un nouveau enseignant");
      setSelectedEnseignant(undefined);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectEnseignant = (enseignant: Enseignant) => {
    setSelectedEnseignant(enseignant);
    setTitle("Modifier enseignant");
    showModal(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Gestion des enseignants</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal(true)}
            icon={<UserAddOutlined />}
          >
            Ajouter un nouveau enseignant
          </Button>
        </Col>
      </Row>
      <Card>
        <EnseignantList
          selectEnseignant={selectEnseignant}
          onRequestFinished={onRequestFinished}
        />
      </Card>
      <EnseignantForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedEnseignant={selectedEnseignant}
      />
    </div>
  );
};
export default ListEnseignant;
