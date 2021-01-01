import React, { useState } from "react";
import EtudiantList from "../../components/Etudiant/EtudiantList";
import { Card } from "antd";
import { Button, Row, Col, notification, Typography } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";

import EtudiantForm from "../../components/Etudiant/EtudiantForm";
import { Etudiant } from "../../store/etudiants/types";
const { Text } = Typography;
const ListEtudiant: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEtudiant, setSelectedEtudiant] = useState<Etudiant>();
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
      setTitle("Ajouter un nouveau etudiant");
      setSelectedEtudiant(undefined);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectEtudiant = (etudiant: Etudiant) => {
    setSelectedEtudiant(etudiant);
    setTitle("Modifier etudiant");
    showModal(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Gestion des étudiant</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal(true)}
            icon={<UserAddOutlined />}
          >
            Ajouter un nouveau etudiant
          </Button>
        </Col>
      </Row>
      <Card>
        <EtudiantList
          selectEtudiant={selectEtudiant}
          onRequestFinished={onRequestFinished}
        />
      </Card>
      <EtudiantForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedEtudiant={selectedEtudiant}
      />
    </div>
  );
};
export default ListEtudiant;
