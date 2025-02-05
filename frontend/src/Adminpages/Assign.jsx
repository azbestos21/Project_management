import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Button, Input, Form, message, Select, theme } from "antd";
//https://project-management-4.onrender.com
//http://ec2-13-232-5-103.ap-south-1.compute.amazonaws.com:3000
import {
  BorderBottomOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logoimg from "../ANavbar/LogoImg";
import MenuItem from "../ANavbar/MenuItem";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../ANavbar/ToggleButton";


const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Assign = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [mentorOptions, setMentorOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    const fetchProjectOptions = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-6-18-59.ap-south-1.compute.amazonaws.com:3000/auth/projectoption"
        );
        if (response.data && response.data.mentorData) {
          setProjectOptions(response.data.mentorData);
        } else {
          setProjectOptions([]);
        }
      } catch (error) {
        console.error("Error fetching project options:", error);
        setProjectOptions([]);
      }
    };

    fetchProjectOptions();
  }, []);

  useEffect(() => {
    const fetchMentorOptions = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-6-18-59.ap-south-1.compute.amazonaws.com:3000/auth/mentoroption"
        );
        if (response.data && response.data.mentorData) {
          setMentorOptions(response.data.mentorData);
        } else {
          setMentorOptions([]);
        }
      } catch (error) {
        console.error("Error fetching mentor options:", error);
        setMentorOptions([]);
      }
    };

    fetchMentorOptions();
  }, []);

  useEffect(() => {
    const fetchTeamOptions = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-6-18-59.ap-south-1.compute.amazonaws.com:3000/auth/teamoption"
        );
        if (response.data && response.data.teamData) {
          setTeamOptions(response.data.teamData);
        } else {
          setTeamOptions([]);
        }
      } catch (error) {
        console.error("Error fetching team options:", error);
        setTeamOptions([]);
      }
    };

    fetchTeamOptions();
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleAssign = async (values) => {
    try {
      await axios.post("http://ec2-3-6-18-59.ap-south-1.compute.amazonaws.com:3000/auth/assign", values);
      message.success("Mentor and project assigned successfully");
      form.resetFields(); // Clear the form fields
    } catch (error) {
      message.error("Failed to assign mentor and project");
    }
  };

  return (
    <Layout
      className="overflow-y-auto h-32"
      style={{ height: "100vh", overflow: "hidden" }}
    >
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
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content
          className="overflow-y-auto p-5 rounded-md"
          style={{ padding: "24px", borderRadius: borderRadiusLG }}
        >
          <div className="container mx-auto text-center"></div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Assign Project and Mentor
            </h3>
            <Form form={form} onFinish={handleAssign}>
              <Form.Item
                label="Team_ID"
                name="Team_ID"
                rules={[{ required: true, message: "Please select a team!" }]}
              >
                <Select placeholder="Select a team">
                  {teamOptions.map((option) => (
                    <Option key={option.Team_ID} value={option.Team_ID}>
                      {option.Team_ID}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Project ID"
                name="pid"
                rules={[
                  { required: true, message: "Please select a project!" },
                ]}
              >
                <Select placeholder="Select a project">
                  {projectOptions.map((option) => (
                    <Option key={option.Project_ID} value={option.Project_ID}>
                      {option.Project_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Mentor ID"
                name="mid"
                rules={[{ required: true, message: "Please select a mentor!" }]}
              >
                <Select placeholder="Select a mentor">
                  {mentorOptions.map((option) => (
                    <Option key={option.Mentor_ID} value={option.Mentor_ID}>
                      {option.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
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

export default Assign;
