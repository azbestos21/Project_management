import React from "react";
import {
  DashboardOutlined,
  ProjectOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { GiTeacher } from "react-icons/gi";
const MenuItem = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="h-screen flex flex-col items-center gap-4  relative mt-4"
    >
      <Menu.Item key="dashboard" icon=<DashboardOutlined />>
        Dashboard
      </Menu.Item>
      <Menu.Item key="project" icon=<ProjectOutlined />>
        My Projects
      </Menu.Item>
      <Menu.Item key="Mentor" icon=<GiTeacher />>
        Mentor
      </Menu.Item>
      <Menu.Item key="Calendar" icon=<CalendarOutlined />>
        Calendar
      </Menu.Item>
    </Menu>
  );
};

export default MenuItem;
