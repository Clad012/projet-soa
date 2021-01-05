import React, { useState } from "react";
import ResultatList from "../../components/Resultat/ResultatList";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ResultatForm from "../../components/Resultat/ResultatForm";
import { Resultat } from "../../store/resultats/types";
interface ParamTypes {
  id_etudiant: Record<string, string | undefined>;
}
const ListResultat: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResultat, setSelectedResultat] = useState<Resultat>();
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
          etudiantId={id_etudiant}
        />
      </Card>
      <ResultatForm
        title={title}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
        selectedResultat={selectedResultat}
        etudiantId={id_etudiant}
      />
    </div>
  );
};
export default ListResultat;
