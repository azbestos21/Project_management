import React, { useEffect, useState } from "react";
import Logoimg from "../MNavbar/MLogoimg";
import MenuItem from "../MNavbar/MMenuItem";
import ToggleButton from "../MNavbar/MToggle";
import { Layout, Button, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Badge, Calendar } from "antd";
const { Header, Sider, Content } = Layout;
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "Task1",
        },
        {
          type: "success",
          content: "Task2",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "Ongoing task",
        },
        {
          type: "success",
          content: "Completed task",
        },
        {
          type: "error",
          content: "Pending task",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "Ongoing task",
        },
        {
          type: "success",
          content: "Completed task",
        },
        {
          type: "error",
          content: "Pending task.",
        },
        {
          type: "error",
          content: "Pending task.",
        },
        {
          type: "error",
          content: "Pending task",
        },
        {
          type: "error",
          content: "Pending task",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const MCalendar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
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
        <Content className="overflow-y-auto p-5 rounded-md">
          <Calendar cellRender={cellRender} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MCalendar;
