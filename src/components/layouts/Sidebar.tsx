import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  BarChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "../stylesheets/Sidebar.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ collapsed: window.innerWidth <= 760 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div
          className="logo"
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        >
          <img
            src="/projetSOA.svg"
            style={{ width: collapsed ? "50px" : "120px" }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
          <Menu.Item key="0" icon={<HomeOutlined />}>
            <Link to="/"> Accueil</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <Link to="/etudiants"> Etudiants</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/enseignants"> Enseignants</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="/cadres"> Cadres administratifs</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<BarChartOutlined />} title="Statitiques">
            <Menu.Item key="4">
              {" "}
              <Link to="/statistiques/absences"> Absences</Link>
            </Menu.Item>
            <Menu.Item key="5">
              {" "}
              <Link to="/statistiques/resultats"> Résultats</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
