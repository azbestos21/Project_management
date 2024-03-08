import React, { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Layout, Button, theme } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";

import { studentproject } from "../StudAuth/Services/Api.jsx";

const { Header, Sider, Content } = Layout;
const SDashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const [details, setProjectdetails] = useState([]);

  useEffect(() => {
    console.log(123);
    const fetchdetails = async () => {
      try {
        const { userData } = await studentproject();
        console.log("d=", userData);
        setProjectdetails(userData);
      } catch (error) {}
    };
    fetchdetails();
  }, []);

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
          <div className="flex justify-around gap-4">
            <div className="w-fit h-12 bg-purple-800 m-4 rounded-xl flex items-center  relative px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <GrProjects className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                No.Of Projects :{details.length}
              </div>
            </div>
            <div className="w-fit h-12 bg-orange-800 m-4 rounded-xl flex items-center  relative px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <GrProjects className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                Phase Status :
              </div>
            </div>
            <div className="w-fit h-12 bg-blue-800 m-4 rounded-xl flex items-center px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <MdOutlineGroupAdd className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-white">No Of Students :</div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SDashboard;
