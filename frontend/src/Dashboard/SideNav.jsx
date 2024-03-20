import React, { useState } from "react";
import { RiTimeLine } from "react-icons/ri";
import { Layout, Button, theme } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";
const { Header, Sider, Content } = Layout;
const SideNav = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          <div className="flex justify-between">
            <div className="w-80 h-40 bg-orange-300 m-4 rounded-xl">
              <div className="w-14 h-14 bg-gradient-to-b from-orange-300 to-orange-600 rounded-full mt-6 m-8 ">
                <GrProjects className="w-8 h-8" />
              </div>
            </div>
            <div className="w-80 h-40 bg-blue-300 m-4 rounded-xl flex  ">
              <div className="w-14 h-14 bg-blue-700 rounded-full mt-6 m-8 ">
                <RiTimeLine className="min-w-6 min-h-6 absolute" />
              </div>
              <div className="">Time line</div>
            </div>
            <div className="w-80 h-40 bg-slate-300 m-4 rounded-xl"></div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideNav;
