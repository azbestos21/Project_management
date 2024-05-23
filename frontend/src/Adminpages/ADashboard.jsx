import React, { useEffect, useState } from "react";
import { Layout, Button, Table, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logoimg from "../ANavbar/LogoImg";
import MenuItem from "../ANavbar/MenuItem";
import ToggleButton from "../ANavbar/ToggleButton";
import { adminprojectlist, adminmentorlist, adminstudentlist } from "../AdminAuth/Services/Api";

const { Header, Sider, Content } = Layout;

const ADashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await adminprojectlist();
        setProjects(data.userData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchMentors = async () => {
      try {
        const data = await adminmentorlist();
        setMentors(data.userData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const data = await adminstudentlist();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchProjects();
    fetchMentors();
    fetchStudents();
  }, []);

  const projectColumns = [
    { title: 'Project ID', dataIndex: 'Project_ID', key: 'Project_ID' },
    { title: 'Project Name', dataIndex: 'Project_Name', key: 'Project_Name' },
    { title: 'Phase Status', dataIndex: 'Phase_Status', key: 'Phase_Status' },
    { title: 'Project Marks', dataIndex: 'Project_Marks', key: 'Project_Marks' },
    { title: 'File Path', dataIndex: 'File_Path', key: 'File_Path' },
    { title: 'Project Phase', dataIndex: 'Project_Phase', key: 'Project_Phase' },
    { title: 'Domain', dataIndex: 'domain', key: 'domain' },
  ];

  const mentorColumns = [
    { title: 'Mentor ID', dataIndex: 'Mentor_ID', key: 'Mentor_ID' },
    { title: 'Name', dataIndex: 'Name', key: 'Name' },
    { title: 'Designation', dataIndex: 'Designation', key: 'Designation' },
    { title: 'Phone', dataIndex: 'Phone', key: 'Phone' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
  ];

  const studentColumns = [
    { title: 'USN', dataIndex: 'USN', key: 'USN' },
    { title: 'Name', dataIndex: 'Name', key: 'Name' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Project ID', dataIndex: 'P_ID', key: 'P_ID' },
    { title: 'Mentor ID', dataIndex: 'M_ID', key: 'M_ID' },
  ];

  const tableStyles = {
    container: {
      marginTop: '20px',
    },
    table: {
      backgroundColor: '#f0f2f5',
      borderRadius: '8px',
    },
    thead: {
      backgroundColor: '#001529',
      color: 'white',
    },
    tbody: {
      backgroundColor: 'white',
    },
    tbodyHover: {
      backgroundColor: '#e6f7ff',
    },
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
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content style={{ padding: "24px", background: colorBgContainer, overflowY: 'auto',backgroundColor:'rgba(200,200,200)' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
            <p>Use the sidebar to navigate through the admin features.</p>
          </div>
          <div className="flex justify-around my-8">
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold">Total Projects</h3>
              <p className="text-2xl">{projects.length}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold">Total Mentors</h3>
              <p className="text-2xl">{mentors.length}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold">Total Students</h3>
              <p className="text-2xl">{students.length}</p>
            </div>
          </div>
          <div style={tableStyles.container}>
            <h3 className="text-xl font-semibold mb-4">Project List</h3>
            <Table
              dataSource={projects}
              columns={projectColumns}
              rowKey="Project_ID"
              scroll={{ y: 300 }}
              style={tableStyles.table}
              rowClassName={() => 'custom-row'}
            />
          </div>
          <div style={tableStyles.container}>
            <h3 className="text-xl font-semibold mb-4">Mentor List</h3>
            <Table
              dataSource={mentors}
              columns={mentorColumns}
              rowKey="Mentor_ID"
              scroll={{ y: 300 }}
              style={tableStyles.table}
              rowClassName={() => 'custom-row'}
            />
          </div>
          <div style={tableStyles.container}>
            <h3 className="text-xl font-semibold mb-4">Student List</h3>
            <Table
              dataSource={students}
              columns={studentColumns}
              rowKey="USN"
              scroll={{ y: 300 }}
              style={tableStyles.table}
              rowClassName={() => 'custom-row'}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ADashboard;
