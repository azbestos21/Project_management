import React, { useEffect, useState } from "react";

import { Layout, Button, theme } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { studentproject } from "../StudAuth/Services/Api.jsx";
const { Header, Sider, Content } = Layout;
const Sprojects = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [details, setProjectdetails] = useState(null);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    console.log(123);
    const fetchdetails = async () => {
      try {
        const data = await studentproject();
        console.log(data);
        setProjectdetails(data);
      } catch (error) {}
    };
    fetchdetails();
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
        <Content>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h3 className="text-lg text-center font-bold uppercase p-1 bg-yellow-100 border-b-2 border-yellow-700 opacity-50">
              Project Details
            </h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    Phase status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {details &&
                  details.userData.map((data, index) => (
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
                      <td className="px-6 py-4">{data.Phase_Status}</td>
                      <td className="px-6 py-4">{data.Project_Marks}</td>
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

export default Sprojects;
