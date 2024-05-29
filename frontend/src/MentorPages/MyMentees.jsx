import React, { useState } from "react";
import { Layout, Button, theme } from "antd";
import Logoimg from "../MNavbar/MLogoimg";
import MenuItem from "../MNavbar/MMenuItem";
import ToggleButton from "../MNavbar/MToggle";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { viewgroups } from "../MentorAuth/Services/Api.jsx";
const { Header, Sider, Content } = Layout;

const MyMentees = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [groupdata, setviewgroupdata] = useState(null);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    console.log(1231);
    const fetchgroups = async () => {
      try {
        const data = await viewgroups();
        console.log(data);
        setviewgroupdata(data);
      } catch (error) {}
    };
    fetchgroups();
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
        <Content
          style={{ borderRadius: borderRadiusLG }}
          className="overflow-y-auto p-10"
        >
          {" "}
          <h3 className="text-lg text-center font-bold uppercase p-1 bg-gray-200 border-b-2 border-gray-100 opacity-80 sticky">
            Student Details
          </h3>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm  text-left rtl:text-right text-black-500 dark:text-gray-400">
              <thead className="text-xs text-black-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupdata &&
                  groupdata.userData.map((data, index) => (
                    <tr className="bg-white dark:bg-gray-800" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{data.USN}</td>
                      <td className="px-6 py-4">{data.Name}</td>
                      <td className="px-6 py-4">{data.Project_Name}</td>
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

export default MyMentees;
