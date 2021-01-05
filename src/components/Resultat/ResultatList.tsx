import { Table, Popconfirm, Button, Space } from "antd";
import { ResultatsState, Resultat } from "../../store/resultats/types";
import { fetchRequest, deleteResultat } from "../../store/resultats/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Tooltip } from "antd";
import {} from "@ant-design/icons";
import { useEffect } from "react";
import { Etudiant } from "../../store/etudiants/types";

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  deleteResultat: typeof deleteResultat;
}
interface ResultatListProps {
  selectResultat: (resultat: Resultat) => void;
  onRequestFinished: (type: string, message: string) => void;
  etudiantId: string | undefined;
}

type AllProps = ResultatsState & PropsFromDispatch & ResultatListProps;
const ResultatList = ({
  selectResultat,
  data,
  loading,
  deleteResultat,
  fetchRequest,
  onRequestFinished,
  etudiantId,
}: AllProps) => {
  const getMenu = (record: Resultat) => {
    return (
      <Menu>
        <Menu.Item
          key="4"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Etes-vous sûr de supprimer cet Resultat?"
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
          onClick={() => selectResultat(record)}
        >
          Modifier
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: "Moyenne",
      dataIndex: "moyenne",
      key: "moyenne",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Annee Scolaire",
      dataIndex: "anneeScolaire",
      key: "anneeScolaire",
    },
    {
      title: "Actions",
      key: "actions",
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
    deleteResultat(id);
    onRequestFinished("Succès", "Resultat supprimé!");
  };
  useEffect(() => {
    if (etudiantId) fetchRequest(etudiantId);
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
const mapStateToProps = ({ resultats }: ApplicationState) => ({
  data: resultats.data,
  loading: resultats.loading,
});

const mapDispatchToProps = { fetchRequest, deleteResultat };
export default connect(mapStateToProps, mapDispatchToProps)(ResultatList);
