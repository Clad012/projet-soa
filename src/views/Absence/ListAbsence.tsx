import React, { useState } from "react";
import AbsenceList from "../../components/Absence/AbsenceList";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";

import AbsenceForm from "../../components/Absence/AbsenceForm";
import { Absence } from "../../store/absences/types";

const ListAbsence: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState<Absence>();
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
      setTitle("Ajouter un nouveau absence");
      setSelectedAbsence(undefined);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectAbsence = (absence: Absence) => {
    setSelectedAbsence(absence);
    setTitle("Modifier absence");
    showModal(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Gestion des absences</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal(true)}
            icon={<UserAddOutlined />}
          >
            Ajouter un nouveau absence
          </Button>
        </Col>
      </Row>
      <Card>
        <AbsenceList
          selectAbsence={selectAbsence}
          onRequestFinished={onRequestFinished}
        />
      </Card>
      <AbsenceForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedAbsence={selectedAbsence}
      />
    </div>
  );
};
export default ListAbsence;
