import { storeEtudiant, updateEtudiant } from "../../store/etudiants/actions";
import { connect } from "react-redux";
import { EtudiantsState, Etudiant } from "../../store/etudiants/types";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Modal } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 4, sm: 6 },
  wrapperCol: { span: 20, sm: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};
interface CreateModalProps {
  title: string;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onRequestFinished: (type: string, message: string) => void;
  selectedEtudiant: Etudiant | undefined;
}

interface PropsFromDispatch {
  storeEtudiant: typeof storeEtudiant;
  updateEtudiant: typeof updateEtudiant;
}

type AllProps = PropsFromDispatch & CreateModalProps & EtudiantsState;

const EtudiantForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  storeEtudiant,
  onRequestFinished,
  selectedEtudiant,
  updateEtudiant,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEtudiant) {
      console.log(selectedEtudiant);
      setIsCreate(false);
      form.setFieldsValue(selectedEtudiant);
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  }, [selectedEtudiant]);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished(
        "Succès!",
        isCreate ? "Un nouveau etudiant a été crée" : "Etudiant modifié!"
      );
    }
  }, [loading]);

  const onFinish = (values: Etudiant) => {
    setRequestSent(true);
    if (isCreate) storeEtudiant(values);
    else {
      updateEtudiant(values);
    }
  };

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Annuler
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form="myForm"
          loading={loading}
        >
          Confirmer
        </Button>,
      ]}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        id="myForm"
      >
        <Form.Item shouldUpdate name="id" label="id" hidden></Form.Item>
        <Form.Item
          shouldUpdate
          name="prenom"
          label="Prénom"
          rules={[{ required: true }]}
        >
          <Input placeholder="Prénom de l'étudiant..." />
        </Form.Item>

        <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
          <Input placeholder="Nom de l'étudiant..." />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Nom de l'étudiant..." type="email" />
        </Form.Item>
        <Form.Item
          name="date_naissance"
          label="Date de naissance"
          rules={[{ required: true }]}
        >
          <Input placeholder="Date de naissance" type="date" />
        </Form.Item>
        <Form.Item name="sexe" label="Sexe" rules={[{ required: true }]}>
          <Select placeholder="Selectionner une option" allowClear>
            <Option value="male">Homme</Option>
            <Option value="female">Femme</Option>
          </Select>
        </Form.Item>
        <Form.Item name="classe" label="Classe" rules={[{ required: true }]}>
          <Input placeholder="Classe de l'étudiant..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ etudiants }: ApplicationState) => ({
  data: etudiants.data,
  loading: etudiants.loading,
});

const mapDispatchToProps = { storeEtudiant, updateEtudiant };
export default connect(mapStateToProps, mapDispatchToProps)(EtudiantForm);
