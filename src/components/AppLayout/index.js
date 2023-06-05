import { Layout, Menu, Typography, Row, Col, Tour, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  DotChartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { GetConfig } from "../../api/configuration";
import useToken from "../../hooks/useToken";
const { Content } = Layout;

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export default function AppLayout() {
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({});
  const [checkTour, setCheckTour] = useState(false);
  const { token } = useToken();

  console.log("🚀 ~ file: index.js:20 ~ AppLayout ~ config:", config);
  const navigate = useNavigate();

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchData() {
      const response2 = await GetConfig(token);
      setCheckTour(true);
      setConfig({ ...response2 });
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.js:45 ~ useEffect ~ window.location.href:",
      window.location.href
    );
    if (
      checkTour &&
      config?.city == "" &&
      config?.country == "" &&
      config?.mode == "" &&
      window.location.href.includes("MainPage")
    ) {
      setOpen(true);
    }
  }, [config]);

  const steps = [
    {
      title: "Welcome!",
      description: "We can see you are new in Greta platform :)",
    },
    {
      title: "Welcome!",
      description: "Here some tips to give you the best experience",
    },
    {
      title: "Greta dashboard",
      placement: "right",
      description:
        "In the dashboard you can see your irrigation schedule and your plants temperature and humidity status",
      target: () => ref2.current,
    },
    {
      title: "System configuration",
      placement: "right",
      description:
        "In order to get the best experience, we highly recommend to adjust your system configuration. Let's set it up right now.",
      target: () => ref3.current,
    },
  ];

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
                icon: <VideoCameraOutlined />,
                label: <NavLink to={"/MainPage"}>Greta</NavLink>,
              },
              {
                key: "2",
                icon: <DotChartOutlined />,
                label: (
                  <NavLink ref={ref3} to={"/ConfigPage"}>
                    Configuration
                  </NavLink>
                ),
              },
              {
                key: "3",
                icon: <DashboardOutlined />,
                label: (
                  <NavLink ref={ref2} to={"/dashboard"}>
                    Dashboard
                  </NavLink>
                ),
              },
              {
                key: "4",
                icon: <UserOutlined />,
                label: <NavLink to={"/profile"}>Profile</NavLink>,
              },
              {
                key: "5",
                icon: <UploadOutlined />,
                label: "Logout",
                onClick: () => {
                  localStorage.removeItem("token");
                  window.location.reload();
                },
              },
            ]}
          />
        </Row>
      </Sider>
      <Layout className={"app-content"}>
        <Tour
          open={open}
          onClose={() => {
            setOpen(false);
            navigate("/configPage");
          }}
          steps={steps}
        />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
