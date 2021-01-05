import React, { useState } from "react";
import AbsenceList from "../../components/Absence/AbsenceList";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import AbsenceForm from "../../components/Absence/AbsenceForm";
import { Absence } from "../../store/absences/types";

const ListAbsence: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState<Absence>();
  const [title, setTitle] = useState("");
  let { id_etudiant } = useParams<Record<string, string | undefined>>();

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
      setTitle("Noter une nouvelle absence");
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
            Noter une nouvelle absence
          </Button>
        </Col>
      </Row>
      <Card>
        <AbsenceList
          selectAbsence={selectAbsence}
          onRequestFinished={onRequestFinished}
          etudiantId={id_etudiant}
        />
      </Card>
      <AbsenceForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedAbsence={selectedAbsence}
        etudiantId={id_etudiant}
      />
    </div>
  );
};
export default ListAbsence;
