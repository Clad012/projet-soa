import {
  storeEnseignant,
  updateEnseignant,
} from "../../store/enseignants/actions";
import { connect } from "react-redux";
import { EnseignantsState, Enseignant } from "../../store/enseignants/types";
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
  selectedEnseignant: Enseignant | undefined;
}

interface PropsFromDispatch {
  storeEnseignant: typeof storeEnseignant;
  updateEnseignant: typeof updateEnseignant;
}

type AllProps = PropsFromDispatch & CreateModalProps & EnseignantsState;

const EnseignantForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  storeEnseignant,
  onRequestFinished,
  selectedEnseignant,
  updateEnseignant,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEnseignant) {
      setIsCreate(false);
      form.setFieldsValue(selectedEnseignant);
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  }, [selectedEnseignant]);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished(
        "Succès!",
        isCreate ? "Un nouveau enseignant a été crée" : "Enseignant modifié!"
      );
    }
  }, [loading]);

  const onFinish = (values: Enseignant) => {
    setRequestSent(true);
    if (isCreate) storeEnseignant(values);
    else {
      updateEnseignant(values);
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
          <Input placeholder="Prénom de l'enseignant..." />
        </Form.Item>

        <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
          <Input placeholder="Nom de l'enseignant..." />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Nom de l'enseignant..." type="email" />
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
            <Option value="Homme">Homme</Option>
            <Option value="Femme">Femme</Option>
          </Select>
        </Form.Item>
        <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
          <Input placeholder="Grade de l'enseignant..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ enseignants }: ApplicationState) => ({
  data: enseignants.data,
  loading: enseignants.loading,
});

const mapDispatchToProps = { storeEnseignant, updateEnseignant };
export default connect(mapStateToProps, mapDispatchToProps)(EnseignantForm);
