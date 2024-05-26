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
import LogoutButton from "../ANavbar/logout";
const MenuItem = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="h-screen flex flex-col items-center gap-4  relative mt-4"
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="project" icon={<ProjectOutlined />}>
        <Link to="/MyProjects"> My Projects</Link>
      </Menu.Item>
      <Menu.Item key="Mentor" icon={<GiTeacher />}>
        <Link to="/Mentor">Mentor</Link>
      </Menu.Item>
      <Menu.Item key="Calendar" icon={<CalendarOutlined />}>
        <Link to="/SCalendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="Logout" icon={<LogoutOutlined/>}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItem;
