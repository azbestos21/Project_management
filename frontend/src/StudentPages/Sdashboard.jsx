import React, { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Layout, Button, theme } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";
import { registerteam } from "../StudAuth/Services/Api.jsx";
import { studentproject, studentteam } from "../StudAuth/Services/Api.jsx";

const { Header, Sider, Content } = Layout;
const SDashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [team, setTeam] = useState();
  const [details, setProjectdetails] = useState([]);
  const [showteam, setShowteam] = useState(false);
  const [showbutton, setshowbutton] = useState(true);
  const [name, setName] = useState();
  const [usn, setUsn] = useState();
  const [mail, setMail] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await studentteam();
        console.log(data);
        setTeam(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleteam = () => {
    console.log(team.students.length);
    if (team.students.length >= 4) {
      setshowbutton(false);
      setShowteam(false);
    } else {
      setshowbutton(true);
      setShowteam(true);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = await registerteam({ usn, name, mail });
    console.log(data);
    setShowteam(false);
  };
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
        <Content className="overflow-y-auto p-2">
          <div className="flex justify-center">
            {showbutton && (
              <button
                onClick={handleteam}
                className="p-4 bg-blue-300 rounded-full  border-2 border-black hover:bg-white m-2 "
              >
                Add Teammates
              </button>
            )}
          </div>
          {showteam && (
            <div className="">
              <div className=""></div>
              <div className=" bg-blue-100 max-w-md mx-auto rounded-md p-4 m-2">
                <form
                  className="max-w-md mx-auto flex flex-col gap-2 p-3"
                  onSubmit={handlesubmit}
                >
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border-none"
                    placeholder="Enter Name"
                  />
                  <input
                    type="text"
                    className="p-3 border-none"
                    onChange={(e) => setUsn(e.target.value)}
                    placeholder="Enter USN"
                  />
                  <input
                    type="email"
                    className="p-3 border-none"
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="your@gmail.com"
                  />
                  <button className="p-3 border-none bg-blue-300">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h3 className="text-lg text-center font-bold uppercase p-1 bg-yellow-100 border-b-2 border-yellow-700 opacity-80">
              Team Details
            </h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    {" "}
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    {" "}
                    USN
                  </th>
                </tr>
              </thead>
              <tbody>
                {team &&
                  team.students.map((data, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.USN}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SDashboard;
