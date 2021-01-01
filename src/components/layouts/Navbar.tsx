import React from "react";
import { Layout, Space, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default class Dashboard extends React.Component {
  render() {
    return (
      <Header
        className="site-layout-background"
        style={{ padding: 0, paddingRight: "35px" }}
      >
        <Row justify="end">
          <Col>
            <span style={{ marginRight: "10px" }}>Administrateur</span>
            <Avatar size="large" icon={<UserOutlined />} />
          </Col>
        </Row>
      </Header>
    );
  }
}
