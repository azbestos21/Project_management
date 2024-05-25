import React, { useEffect, useState } from "react";
import { Layout, Button, Table, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";
import { MdOutlineGroupAdd } from "react-icons/md";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { registerteam, studentproject, studentteam } from "../StudAuth/Services/Api.jsx";

const { Header, Sider, Content } = Layout;

const SDashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [team, setTeam] = useState([]);
  const [details, setProjectDetails] = useState([]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [mail, setMail] = useState("");

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { userData } = await studentproject();
        setProjectDetails(userData);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    fetchProjectDetails();
  }, []);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await studentteam();
        setTeam(data.students);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []);

  const handleTeamButtonClick = () => {
    if (team.length >= 4) {
      setShowButton(false);
    } else {
      setShowTeamForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerteam({ usn, name, mail });
      console.log(data);
      setShowTeamForm(false);
    } catch (error) {
      console.error("Error registering team:", error);
    }
  };

  const projectColumns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "USN", dataIndex: "USN", key: "USN" },
  ];

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
        <Header style={{ padding: 0 }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content style={{ padding: "24px", background: colorBgContainer, overflowY: 'auto', backgroundColor: 'rgba(230,230,230)' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Student Dashboard!</h2>
            <p> Note: Teammates will have same password as the team lead.</p>
          </div>
          <div className="flex justify-center">
          <div className="p-4 bg-white shadow rounded-lg text-center">
    <h3 className="text-lg font-semibold">Total Students</h3>
    <p className="text-2xl">{team.length}</p>
  </div>
  <div className="p-4 bg-white shadow rounded-lg text-center">
    <h3 className="text-lg font-semibold">Total Project</h3>
    <p className="text-2xl">{details.length}</p>
  </div>
</div>
          <div className="flex justify-center">
            {showButton && (
              <button
                onClick={handleTeamButtonClick}
                className="p-4 bg-blue-300 rounded-full border-2 border-black hover:bg-white m-2"
              >
                Add Teammates
              </button>
            )}
          </div>
          {showTeamForm && (
            <div className="bg-gray-100 max-w-md mx-auto rounded-md p-4 m-2">
              <form className="max-w-md mx-auto flex flex-col gap-2 p-3" onSubmit={handleSubmit}>
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
                <button className="p-3 border-none bg-blue-300">Submit</button>
              </form>
            </div>
          )}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h3 className="text-lg text-center font-bold uppercase p-1 bg-gray-100 border-b-2 border-black-700 opacity-80">
              Team Details
            </h3>
            <Table
              dataSource={team}
              columns={projectColumns}
              rowKey="USN"
              scroll={{ y: 300 }}
              style={{ backgroundColor: '#f0f2f5', borderRadius: '8px' }}
              rowClassName={() => 'custom-row'}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SDashboard;
