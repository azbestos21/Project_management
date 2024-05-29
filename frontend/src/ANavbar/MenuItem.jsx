import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MdAssignmentAdd } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { Menu } from "antd";

const MenuItem = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="h-screen flex flex-col items-center gap-4  relative mt-4"
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/Adashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="CreateProject" icon={<IoCreateOutline />}>
        <Link to="/CreateProject">Create Project</Link>
      </Menu.Item>
      <Menu.Item key="Assign" icon={<MdAssignmentAdd />}>
        <Link to="/Assign">Assign</Link>
      </Menu.Item>
      <Menu.Item key="Calendar" icon={<CalendarOutlined />}>
        <Link to="/ACalendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="Logout" icon={<LogoutOutlined />}>
        <Link to="/Alogin">Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItem;
