import { storeResultat, updateResultat } from "../../store/resultats/actions";
import { connect } from "react-redux";
import { ResultatsState, Resultat } from "../../store/resultats/types";
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
  selectedResultat: Resultat | undefined;
}

interface PropsFromDispatch {
  storeResultat: typeof storeResultat;
  updateResultat: typeof updateResultat;
}

type AllProps = PropsFromDispatch & CreateModalProps & ResultatsState;

const ResultatForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  storeResultat,
  onRequestFinished,
  selectedResultat,
  updateResultat,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedResultat) {
      setIsCreate(false);
      form.setFieldsValue(selectedResultat);
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  }, [selectedResultat]);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished(
        "Succès!",
        isCreate ? "Un nouveau resultat a été crée" : "Resultat modifié!"
      );
    }
  }, [loading]);

  const onFinish = (values: Resultat) => {
    setRequestSent(true);
    if (isCreate) storeResultat(values);
    else {
      updateResultat(values);
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
        <Form.Item
          shouldUpdate
          name="prenom"
          label="Prénom"
          rules={[{ required: true }]}
        >
          <Input placeholder="Prénom de l'resultat..." />
        </Form.Item>

        <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
          <Input placeholder="Nom de l'resultat..." />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Nom de l'resultat..." type="email" />
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
        <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
          <Input placeholder="Grade de l'resultat..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ resultats }: ApplicationState) => ({
  data: resultats.data,
  loading: resultats.loading,
});

const mapDispatchToProps = { storeResultat, updateResultat };
export default connect(mapStateToProps, mapDispatchToProps)(ResultatForm);
