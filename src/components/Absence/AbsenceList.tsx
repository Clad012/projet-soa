import { Table, Popconfirm, Button, Space } from "antd";
import { AbsencesState, Absence } from "../../store/absences/types";
import { fetchRequest, deleteAbsence } from "../../store/absences/actions";
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
  deleteAbsence: typeof deleteAbsence;
}
interface AbsenceListProps {
  selectAbsence: (absence: Absence) => void;
  onRequestFinished: (type: string, message: string) => void;
  etudiantId: string | undefined;
}

type AllProps = AbsencesState & PropsFromDispatch & AbsenceListProps;
const AbsenceList = ({
  selectAbsence,
  data,
  loading,
  deleteAbsence,
  fetchRequest,
  onRequestFinished,
  etudiantId,
}: AllProps) => {
  const getMenu = (record: Absence) => {
    return (
      <Menu>
        <Menu.Item
          key="4"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Etes-vous sûr de supprimer cette Absence?"
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
          onClick={() => selectAbsence(record)}
        >
          Modifier
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: "Date de l'absence",
      dataIndex: "date",
      key: "date",
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
    deleteAbsence(id);
    onRequestFinished("Succès", "Absence supprimé!");
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
const mapStateToProps = ({ absences }: ApplicationState) => ({
  data: absences.data,
  loading: absences.loading,
});

const mapDispatchToProps = { fetchRequest, deleteAbsence };
export default connect(mapStateToProps, mapDispatchToProps)(AbsenceList);
