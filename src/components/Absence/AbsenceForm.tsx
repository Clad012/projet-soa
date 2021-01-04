import { storeAbsence, updateAbsence } from "../../store/absences/actions";
import { connect } from "react-redux";
import { AbsencesState, Absence } from "../../store/absences/types";
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
  selectedAbsence: Absence | undefined;
}

interface PropsFromDispatch {
  storeAbsence: typeof storeAbsence;
  updateAbsence: typeof updateAbsence;
}

type AllProps = PropsFromDispatch & CreateModalProps & AbsencesState;

const AbsenceForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  storeAbsence,
  onRequestFinished,
  selectedAbsence,
  updateAbsence,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedAbsence) {
      setIsCreate(false);
      form.setFieldsValue(selectedAbsence);
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  }, [selectedAbsence]);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished(
        "Succès!",
        isCreate ? "Un nouveau absence a été crée" : "Absence modifié!"
      );
    }
  }, [loading]);

  const onFinish = (values: Absence) => {
    setRequestSent(true);
    if (isCreate) storeAbsence(values);
    else {
      updateAbsence(values);
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
          <Input placeholder="Prénom de l'absence..." />
        </Form.Item>

        <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
          <Input placeholder="Nom de l'absence..." />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Nom de l'absence..." type="email" />
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
          <Input placeholder="Grade de l'absence..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ absences }: ApplicationState) => ({
  data: absences.data,
  loading: absences.loading,
});

const mapDispatchToProps = { storeAbsence, updateAbsence };
export default connect(mapStateToProps, mapDispatchToProps)(AbsenceForm);
