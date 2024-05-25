import React, { useState,useEffect } from "react";
import { Layout, Button, Input, Form, message,Select } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logoimg from "../ANavbar/LogoImg";
import MenuItem from "../ANavbar/MenuItem";
import ToggleButton from "../ANavbar/ToggleButton";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const Actions = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [mentorOptions, setMentorOptions] = useState([]);

  useEffect(() => {
    const fetchProjectOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/projectoption");
        setProjectOptions(response.data.mentorData);
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
        setMentorOptions(response.data.mentorData);
      } catch (error) {
        console.error("Error fetching project options:", error);
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
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Create Project
              </button>
            </Form>
            </div>
            <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assign Project and Mentor</h3>
            <Form onFinish={handleAssign}>
            {/* Mentor ID input */}
            <Form.Item label="Mentor ID" name="M_ID">
            <Select>
              {mentorOptions.map((option) => (
                <Select.Option key={option.Mentor_ID} value={option.Mentor_ID}>
                  {option.Mentor_Name}
                </Select.Option>
              ))}
            </Select>
            </Form.Item>
            {/* Project ID dropdown */}
            <Form.Item label="Project ID" name="P_ID">
                          <Select>
                {projectOptions.map((option) => (
                  <Select.Option key={option.Project_ID} value={option.Project_ID}>
                    {option.Project_Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* Team ID input */}
            <Form.Item label="Team ID" name="Team_ID">
              <Input />
            </Form.Item>
            {/* Submit button */}
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Assign
              </button>
          </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Actions;
