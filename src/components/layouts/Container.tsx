import React from "react";
import { Layout, Breadcrumb } from "antd";
import Routes from "../../routes";
const { Content } = Layout;

export default class Dashboard extends React.Component {
  render() {
    return (
      <Content style={{ margin: "0 16px", paddingTop: "30px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}
        <div style={{ padding: 24, minHeight: 360 }}>
          <Routes />
        </div>
      </Content>
    );
  }
}
