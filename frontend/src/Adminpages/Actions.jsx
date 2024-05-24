import React, { useState } from "react";
import { Layout, Button, Input, Form, message } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logoimg from "../ANavbar/LogoImg";
import MenuItem from "../ANavbar/MenuItem";
import ToggleButton from "../ANavbar/ToggleButton";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const Actions = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleAssignMentor = async (values) => {
    try {
      await axios.post("http://localhost:3000/auth/assignmentor", values);
      message.success("Mentor assigned successfully");
    } catch (error) {
      message.error("Failed to assign mentor");
    }
  };

  const handleCreateProject = async (values) => {
    try {
      await axios.post("http://localhost:3000/auth/newproject", values);
      message.success("Project created successfully");
    } catch (error) {
      message.error("Failed to create project");
    }
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className=""
      >
        <Logoimg />
        <MenuItem darkTheme={darkTheme} />
        <ToggleButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
        </Header>
        <Content style={{ padding: "24px" }}>
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Actions</h2>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assign Mentor</h3>
            <Form onFinish={handleAssignMentor}>
              <Form.Item label="Mentor ID" name="mid">
                <Input />
              </Form.Item>
              <Form.Item label="Project ID" name="pid">
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ color: 'black' }}>
                Assign Mentor
              </Button>
            </Form>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Create Project</h3>
            <Form onFinish={handleCreateProject}>
              <Form.Item label="Project Name" name="projectName">
                <Input />
              </Form.Item>
              <Form.Item label="Domain" name="domain">
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ color: 'black' }}>
                Create Project
              </Button>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Actions;
