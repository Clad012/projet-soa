import { storeCadre, updateCadre } from "../../store/cadres/actions";
import { connect } from "react-redux";
import { CadresState, Cadre } from "../../store/cadres/types";
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
  selectedCadre: Cadre | undefined;
}

interface PropsFromDispatch {
  storeCadre: typeof storeCadre;
  updateCadre: typeof updateCadre;
}

type AllProps = PropsFromDispatch & CreateModalProps & CadresState;

const CadreForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  storeCadre,
  onRequestFinished,
  selectedCadre,
  updateCadre,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCadre) {
      setIsCreate(false);
      form.setFieldsValue(selectedCadre);
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  }, [selectedCadre]);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished(
        "Succès!",
        isCreate
          ? "Un nouveau cadre administratif a été crée"
          : "Cadre administratif modifié!"
      );
    }
  }, [loading]);

  const onFinish = (values: Cadre) => {
    setRequestSent(true);
    if (isCreate) storeCadre(values);
    else {
      updateCadre(values);
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
          <Input placeholder="Prénom du cadre administratif..." />
        </Form.Item>

        <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
          <Input placeholder="Nom du cadre administratif..." />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Nom du cadre administratif..." type="email" />
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
        <Form.Item name="poste" label="Poste" rules={[{ required: true }]}>
          <Input placeholder="Poste du cadre administratif..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ cadres }: ApplicationState) => ({
  data: cadres.data,
  loading: cadres.loading,
});

const mapDispatchToProps = { storeCadre, updateCadre };
export default connect(mapStateToProps, mapDispatchToProps)(CadreForm);
