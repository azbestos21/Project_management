import React, { useState } from "react";
import axios from "axios";
import { Layout, Button, Input, Form, message } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logoimg from "../ANavbar/LogoImg";
import MenuItem from "../ANavbar/MenuItem";

const { Header, Sider, Content } = Layout;

const Actions = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleCreateProject = async (values) => {
    try {
      await axios.post("http://localhost:3000/auth/newproject", values);
      message.success("Project created successfully");
      form.resetFields(); // Clear the form fields
    } catch (error) {
      message.error("Failed to create project");
    }
  };

  return (
    <Layout className="overflow-y-auto h-32" style={{ height: "100vh", overflow: "hidden" }}>
      <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? "dark" : "light"} className="">
        <Logoimg />
        <MenuItem darkTheme={darkTheme} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: darkTheme ? "#001529" : "#fff" }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content className="overflow-y-auto p-5 rounded-md" style={{ padding: "24px" }}>
          <div className="container mx-auto text-center"></div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Create Project</h3>
            <Form form={form} onFinish={handleCreateProject}>
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: "Please input the project name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Domain"
                name="domain"
                rules={[{ required: true, message: "Please input the domain!" }]}
              >
                <Input />
              </Form.Item>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Create
              </button>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Actions;
