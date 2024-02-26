import React, { useState } from "react";
import { Layout, Button, theme } from "antd";
import Logoimg from "../MNavbar/MLogoimg";
import MenuItem from "../MNavbar/MMenuItem";
import ToggleButton from "../MNavbar/MToggle";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import ActionButton from "../Buttons/Button";
import { useEffect } from "react";
const { Header, Sider, Content } = Layout;
import { viewprojects, updateDetails } from "../MentorAuth/Services/Api.jsx";
const MProjects = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [projectdata, setprojectdata] = useState(null);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    const fetchproject = async () => {
      try {
        const data = await viewprojects();

        setprojectdata(data);
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchproject();
  }, []);

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
        <Content className="overflow-y-auto p-10">
          {" "}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h3 className="text-lg text-center font-bold uppercase p-1 bg-yellow-100 border-b-2 border-yellow-700 opacity-80 text-black">
            Project Details
          </h3>
            <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project phase
                  </th>
                  <th scope="col" className="px-6 py-3">
                    File Path
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phase status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project marks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectdata &&
                  projectdata.userData.map((data, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.Project_Name}
                      </th>
                      <td className="px-6 py-4">{data.Project_ID}</td>
                      <td className="px-6 py-4">{data.Project_Phase}</td>
                      <td className="px-6 py-4">{data.File_Path}</td>
                      <td className="px-6 py-4">{data.Phase_Status}</td>
                      <td className="px-6 py-4">{data.Project_Marks}</td>
                      <td className="px-6 py-4">
                        <ActionButton
                          label={"Accept"}
                          onClick={() => updateDetails(data.Project_ID, 1)}
                        />{" "}
                        <br></br>{" "}
                        <ActionButton 
                          
                          label={"  Reject  "}
                          onClick={() => updateDetails(data.Project_ID, 0)}
                        />{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MProjects;
