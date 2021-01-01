import { Table, Popconfirm, Button, Space } from "antd";
import { CadresState, Cadre } from "../../store/cadres/types";
import { fetchRequest, deleteCadre } from "../../store/cadres/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Tooltip } from "antd";
import {} from "@ant-design/icons";
import { useEffect } from "react";

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  deleteCadre: typeof deleteCadre;
}
interface CadreListProps {
  selectCadre: (cadre: Cadre) => void;
  onRequestFinished: (type: string, message: string) => void;
}

type AllProps = CadresState & PropsFromDispatch & CadreListProps;
const CadreList = ({
  selectCadre,
  data,
  loading,
  deleteCadre,
  fetchRequest,
  onRequestFinished,
}: AllProps) => {
  const getMenu = (record: Cadre) => {
    return (
      <Menu>
        <Menu.Item
          key="4"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Etes-vous sûr de supprimer ce cadre administratif?"
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
          onClick={() => selectCadre(record)}
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
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
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
    deleteCadre(id);
    onRequestFinished("Succès", "Cadre administratif supprimé!");
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
const mapStateToProps = ({ cadres }: ApplicationState) => ({
  data: cadres.data,
  loading: cadres.loading,
});

const mapDispatchToProps = { fetchRequest, deleteCadre };
export default connect(mapStateToProps, mapDispatchToProps)(CadreList);
