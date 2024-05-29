import React, { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Layout, Button, Table, theme } from "antd";
import Logoimg from "../MNavbar/MLogoimg";
import MenuItem from "../MNavbar/MMenuItem";
import { FaRegCheckCircle } from "react-icons/fa";
import ToggleButton from "../MNavbar/MToggle";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";
import {
  mentordetails,
  viewgroups,
  viewprojects,
} from "../MentorAuth/Services/Api";

const { Header, Sider, Content } = Layout;

const MDashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [groupdata, setviewgroupdata] = useState(null);
  const [projectdata, setprojectdata] = useState(null);
  const [phasestatus, setphasestatus] = useState(null);
  const [mentor, setMentordata] = useState();

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchgroups = async () => {
      try {
        const data = await viewgroups();
        setviewgroupdata(data);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchgroups();

    const fetchproject = async () => {
      try {
        const data = await viewprojects();
        setprojectdata(data);
        if (data && data.userData && data.userData.length > 0) {
          const completeProjectsCount = data.userData.filter(
            (project) => project.Phase_Status === "Completed"
          ).length;
          setphasestatus(completeProjectsCount);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchproject();
  }, []);

  useEffect(() => {
    const details = async () => {
      try {
        const mentordata = await mentordetails();
        setMentordata(mentordata);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };
    details();
  }, []);

  const infoCardStyle = "p-4 bg-white shadow rounded-lg text-center";
  const tableStyles = {
    container: {
      marginTop: "20px",
    },
    table: {
      backgroundColor: "#f0f2f5",
      borderRadius: "8px",
    },
    thead: {
      backgroundColor: "#001529",
      color: "white",
    },
    tbody: {
      backgroundColor: "white",
    },
    tbodyHover: {
      backgroundColor: "#e6f7ff",
    },
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
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
          style={{
            padding: "24px",

            overflowY: "auto",
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to the Mentor Dashboard!
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Projects</h3>
              <p className="text-2xl">
                {projectdata && projectdata.userData.length}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Students</h3>
              <p className="text-2xl">
                {groupdata && groupdata.userData.length}
              </p>
            </div>
          </div>

          <div style={tableStyles.container}>
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden p-4">
              {mentor &&
                mentor.mentor.map((data, index) => (
                  <div key={index}>
                    <div className="text-lg font-semibold mb-2">Details</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold">Mentor ID:</div>
                        <div>{data.Mentor_ID}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Name:</div>
                        <div>{data.NAME}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Email:</div>
                        <div>{data.Email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Phone:</div>
                        <div>{data.Phone}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          Designation:
                        </div>
                        <div>{data.Designation}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MDashboard;
