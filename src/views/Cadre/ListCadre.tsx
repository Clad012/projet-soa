import React, { useState } from "react";
import CadreList from "../../components/Cadre/CadreList";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";

import CadreForm from "../../components/Cadre/CadreForm";
import { Cadre } from "../../store/cadres/types";

const ListCadre: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCadre, setSelectedCadre] = useState<Cadre>();
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
      setTitle("Ajouter un nouveau cadre administratif");
      setSelectedCadre(undefined);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectCadre = (cadre: Cadre) => {
    setSelectedCadre(cadre);
    setTitle("Modifier cadre");
    showModal(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Gestion des cadres administratifs</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal(true)}
            icon={<UserAddOutlined />}
          >
            Ajouter un nouveau cadre administratif
          </Button>
        </Col>
      </Row>
      <Card>
        <CadreList
          selectCadre={selectCadre}
          onRequestFinished={onRequestFinished}
        />
      </Card>
      <CadreForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedCadre={selectedCadre}
      />
    </div>
  );
};
export default ListCadre;
