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
  etudiantId: string | undefined;
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
  etudiantId,
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
    if (isCreate) storeResultat({ ...values, etudiantId });
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
        <Form.Item shouldUpdate name="id" label="id" hidden></Form.Item>
        <Form.Item
          shouldUpdate
          name="moyenne"
          label="Moyenne"
          rules={[{ required: true, max: 20, min: 0 }]}
        >
          <Input
            placeholder="Préciser la moyenne..."
            type="number"
            min="0"
            max="20"
          />
        </Form.Item>

        <Form.Item
          name="anneeScolaire"
          label="Année scolaire"
          rules={[{ required: true }]}
        >
          <Select placeholder="Selectionner une option" allowClear>
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
const mapStateToProps = ({ resultats }: ApplicationState) => ({
  data: resultats.data,
  loading: resultats.loading,
});

const mapDispatchToProps = { storeResultat, updateResultat };
export default connect(mapStateToProps, mapDispatchToProps)(ResultatForm);
