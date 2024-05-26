import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { GiTeacher } from "react-icons/gi";
const MenuItem = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="h-screen flex flex-col items-center gap-4  relative mt-4"
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/Adashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="CreateProject" icon={<CalendarOutlined />}>
        <Link to="/CreateProject">Create Project</Link>
      </Menu.Item>
      <Menu.Item key="Assign" icon={<CalendarOutlined />}>
        <Link to="/Assign">Assign</Link>
      </Menu.Item>
      <Menu.Item key="Calendar" icon={<CalendarOutlined />}>
        <Link to="/ACalendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="Logout" icon={<LogoutOutlined/>}>
        <Link to="/Alogin">Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItem;
