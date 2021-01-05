import { Table, Popconfirm, Button, Space } from "antd";
import { EnseignantsState, Enseignant } from "../../store/enseignants/types";
import {
  fetchRequest,
  deleteEnseignant,
} from "../../store/enseignants/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Tooltip } from "antd";
import {} from "@ant-design/icons";
import { useEffect } from "react";

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  deleteEnseignant: typeof deleteEnseignant;
}
interface EnseignantListProps {
  selectEnseignant: (enseignant: Enseignant) => void;
  onRequestFinished: (type: string, message: string) => void;
}

type AllProps = EnseignantsState & PropsFromDispatch & EnseignantListProps;
const EnseignantList = ({
  selectEnseignant,
  data,
  loading,
  deleteEnseignant,
  fetchRequest,
  onRequestFinished,
}: AllProps) => {
  const getMenu = (record: Enseignant) => {
    return (
      <Menu>
        <Menu.Item
          key="4"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Etes-vous sûr de supprimer cet Enseignant?"
            onConfirm={() => confirmDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            Supprimer
          </Popconfirm>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<EditOutlined />}
          style={{ color: "#108ee9" }}
          onClick={() => selectEnseignant(record)}
        >
          Modifier
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Date de naissance",
      dataIndex: "date_naissance",
      key: "date_naissance",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Sexe",
      key: "sexe",
      dataIndex: "sexe",
    },
    {
      title: "Actions",
      key: "actons",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Dropdown overlay={getMenu(record)} trigger={["click"]}>
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const confirmDelete = (id: number) => {
    deleteEnseignant(id);
    onRequestFinished("Succès", "Enseignant supprimé!");
  };
  useEffect(() => {
    fetchRequest("");
  }, []);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.id}
      className="responsive-table"
    />
  );
};
const mapStateToProps = ({ enseignants }: ApplicationState) => ({
  data: enseignants.data,
  loading: enseignants.loading,
});

const mapDispatchToProps = { fetchRequest, deleteEnseignant };
export default connect(mapStateToProps, mapDispatchToProps)(EnseignantList);
