import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Button, Input, Form, message, Select } from "antd";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Actions = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [mentorOptions, setMentorOptions] = useState([]);

  useEffect(() => {
    const fetchProjectOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/projectoption");
        setProjectOptions(response.data.projectData); // Adjusted to match correct data structure
      } catch (error) {
        console.error("Error fetching project options:", error);
      }
    };

    fetchProjectOptions();
  }, []);

  useEffect(() => {
    const fetchMentorOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/mentoroption");
        setMentorOptions(response.data.mentorData); // Adjusted to match correct data structure
      } catch (error) {
        console.error("Error fetching mentor options:", error);
      }
    };

    fetchMentorOptions();
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleAssign = async (values) => {
    try {
      await axios.post("http://localhost:3000/auth/assign", values);
      message.success("Mentor and project assigned successfully");
      console.log("Form values:", values);
    } catch (error) {
      message.error("Failed to assign mentor and project");
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
      <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? "dark" : "light"} className="">
        {/* Logo, Menu and Theme Toggle omitted for brevity */}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content className="overflow-y-auto p-5 rounded-md" style={{ padding: "24px" }}>
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Actions</h2>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Create Project</h3>
            <Form onFinish={handleCreateProject}>
              <Form.Item label="Project Name" name="projectName" rules={[{ required: true, message: 'Please input the project name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Domain" name="domain" rules={[{ required: true, message: 'Please input the domain!' }]}>
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ color: "black" }} className="bg-blue-300 shadow-xl">
                Create Project
              </Button>
            </Form>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assign Project and Mentor</h3>
            <Form onFinish={handleAssign}>
              <Form.Item label="Mentor" name="M_ID" rules={[{ required: true, message: 'Please select a mentor!' }]}>
                <Select placeholder="Select a mentor">
                  {mentorOptions.map((option) => (
                    <Option key={option.Mentor_ID} value={option.Mentor_ID}>
                      {option.Mentor_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Project" name="P_ID" rules={[{ required: true, message: 'Please select a project!' }]}>
                <Select placeholder="Select a project">
                  {projectOptions.map((option) => (
                    <Option key={option.Project_ID} value={option.Project_ID}>
                      {option.Project_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Team ID" name="Team_ID" rules={[{ required: true, message: 'Please input the team ID!' }]}>
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ color: "black" }}>
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
