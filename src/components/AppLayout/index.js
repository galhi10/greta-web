import { Layout, Menu, Typography, Row, Col } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink, Outlet } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./index.css";
const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      <Sider>
        <Row className="sider-headline-container">
          <Col span={24}>
            <Typography.Title level={1} style={{ margin: 0, color: "white" }}>
              GRETA
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <NavLink to={"/profile"}>Profile</NavLink>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <NavLink to={"/MainPage"}>Main page</NavLink>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <NavLink to={"/ConfigPage"}>Configuration</NavLink>,
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: <NavLink to={"/"}>Logout</NavLink>,
              },
            ]}
          />
        </Row>
      </Sider>
      <Layout className={"app-content"}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
