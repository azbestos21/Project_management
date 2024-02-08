import React, { useState } from "react";

import { Layout } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";

const { Header, Sider } = Layout;
export default function Dash() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <Layout>
      <Sider theme={darkTheme ? "dark" : "light"} className="">
        <Logoimg />
        <MenuItem darkTheme={darkTheme} />
        <ToggleButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
    </Layout>
  );
}
