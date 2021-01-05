import { Table, Popconfirm, Button, Space } from "antd";
import { EtudiantsState, Etudiant } from "../../store/etudiants/types";
import { fetchRequest, deleteEtudiant } from "../../store/etudiants/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  CheckSquareOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Tooltip } from "antd";
import {} from "@ant-design/icons";
import { useEffect } from "react";

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  deleteEtudiant: typeof deleteEtudiant;
}
interface EtudiantListProps {
  selectEtudiant: (etudiant: Etudiant) => void;
  onRequestFinished: (type: string, message: string) => void;
}

type AllProps = EtudiantsState & PropsFromDispatch & EtudiantListProps;
const EtudiantList = ({
  selectEtudiant,
  data,
  loading,
  deleteEtudiant,
  fetchRequest,
  onRequestFinished,
}: AllProps) => {
  const getMenu = (record: Etudiant) => {
    return (
      <Menu>
        <Menu.Item
          key="4"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Etes-vous sûr de supprimer cet Etudiant?"
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
          onClick={() => selectEtudiant(record)}
        >
          Modifier
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<CheckSquareOutlined />}
          style={{ color: "#192a56" }}
        >
          Marquer comme absent
        </Menu.Item>
        <Menu.Item key="2" icon={<AuditOutlined />}>
          Attribuer une note
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
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
      render: (date: string) => (
        <span>{date ? date.substring(0, 9) : "---"}</span>
      ),
    },
    {
      title: "Classe",
      dataIndex: "classe",
      key: "classe",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Sexe",
      key: "sexe",
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
    deleteEtudiant(id);
    onRequestFinished("Succès", "Etudiant supprimé!");
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
const mapStateToProps = ({ etudiants }: ApplicationState) => ({
  data: etudiants.data,
  loading: etudiants.loading,
});

const mapDispatchToProps = { fetchRequest, deleteEtudiant };
export default connect(mapStateToProps, mapDispatchToProps)(EtudiantList);
