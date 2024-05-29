import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Button, theme } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { mentorinfo } from "../StudAuth/Services/Api";

const { Header, Sider, Content } = Layout;

const Smentor = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState("");

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await mentorinfo();
        if (data.students) {
          setInfo(data.students);
        } else if (data.message) {
          setMessage(data.message);
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred while fetching data.");
      }
    };
    fetchdata();
  }, []);

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
            overflow: "auto",
            padding: "24px",
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 bg-gray-100 p-2 border-b-2 border-black-600">
              Mentor Information
            </h2>
            <div className="bg-white p-4 rounded shadow">
              {message ? (
                <div className="text-red-600 text-center">{message}</div>
              ) : (
                info &&
                info.map((mentor, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Name:</div>
                      <div className="ml-2">
                        <h3 className="text-lg font-semibold">{mentor.Name}</h3>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Designation:</div>
                      <div className="ml-2">
                        <p className="text-gray-600">{mentor.Designation}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Email:</div>
                      <div className="ml-2">
                        <p className="text-gray-600">{mentor.Email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Phone:</div>
                      <div className="ml-2">
                        <p className="text-gray-600">{mentor.Phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-bold text-lg">Mentor ID:</div>
                      <div className="ml-2">
                        <p className="text-gray-600">{mentor.Mentor_ID}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Smentor;
