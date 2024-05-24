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

  const handleAssign = async (values) => {
    try {
      await axios.post("http://localhost:3000/auth/assign", values);
      message.success("Mentor and project assigned successfully");
    } catch (error) {
      message.error("Failed to assign mentor and project ");
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
    <Layout className="overflow-y-auto h-32" style={{ height: "100vh", overflow: "hidden" }}>
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
          <div className="mt-8 ">
            <h3 className="text-xl font-semibold mb-4">Create Project</h3>
            <Form onFinish={handleCreateProject}>
              <Form.Item label="Project Name" name="projectName">
                <Input/>
              </Form.Item>
              <Form.Item label="Domain" name="domain">
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ color: 'black' }}>
                Create Project
              </Button>
            </Form>
            </div>
            <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assign Project and Mentor</h3>
            <Form onFinish={handleAssign}>
              <Form.Item label="Mentor ID" name="mid">
                <Input />
              </Form.Item>
              <Form.Item label="Project ID" name="pid">
                <Input />
              </Form.Item>
              <Form.Item label="Team_ID" name="Team_ID">
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ color: 'black' }}>
                Assign 
              </Button>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Actions;
