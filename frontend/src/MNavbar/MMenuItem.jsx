import React from "react";
import {
  DashboardOutlined,
  ProjectOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { MdOutlineGroups } from "react-icons/md";
import { Link } from "react-router-dom";
const MenuItem = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="h-screen flex flex-col items-center gap-4  relative mt-4"
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/Mdashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="project" icon={<ProjectOutlined />}>
        <Link to="/Mprojects">Projects</Link>
      </Menu.Item>
      <Menu.Item key="Mentor" icon={<MdOutlineGroups />}>
        <Link to="/Mymentees">My Mentees</Link>
      </Menu.Item>
      <Menu.Item key="Mentor" icon={<MdOutlineGroups />}>
        <Link to="/MCalendar">Calendar</Link>
      </Menu.Item>
    </Menu>
  );
};
export default MenuItem;
