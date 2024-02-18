import React from "react";
import {
  DashboardOutlined,
  ProjectOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { MdOutlineGroups } from "react-icons/md";

const MenuItem = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="h-screen flex flex-col items-center gap-4  relative mt-4"
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="project" icon={<ProjectOutlined />}>
        Projects
      </Menu.Item>
      <Menu.Item key="Mentor" icon={<MdOutlineGroups />}>
        My Mentees
      </Menu.Item>
      <Menu.Item key="Calendar" icon={<CalendarOutlined />}>
        Calendar
      </Menu.Item>
    </Menu>
  );
};
export default MenuItem;
