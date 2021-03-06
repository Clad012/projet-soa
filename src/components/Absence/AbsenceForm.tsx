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
  etudiantId: string | undefined;
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
  etudiantId,
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
        isCreate ? "Absence prise en compte" : "Absence modifiée!"
      );
    }
  }, [loading]);

  const onFinish = (values: Absence) => {
    setRequestSent(true);
    if (isCreate) storeAbsence({ ...values, etudiantId });
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
        <Form.Item shouldUpdate name="id" label="id" hidden></Form.Item>
        <Form.Item
          name="date"
          label="Date de l'absence"
          rules={[{ required: true }]}
        >
          <Input placeholder="Date de l'absence" type="date" />
        </Form.Item>

        <Form.Item
          name="anneeScolaire"
          label="Année scolaire"
          rules={[{ required: true }]}
        >
          <Select placeholder="Selectionner une année scolaire" allowClear>
            <Option value="2019/2020">2019/2020</Option>
            <Option value="2020/2021">2020/2021</Option>
            <Option value="2021/2022">2021/2022</Option>
            <Option value="2022/2023">2022/2023</Option>
            <Option value="2023/2024">2023/2024</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="anneeScolaire"
          label="Année scolaire"
          rules={[{ required: true }]}
        >
          <Input placeholder="Préciser l'année scolaire..." />
        </Form.Item> */}
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
