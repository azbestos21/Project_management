import React, { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Layout, Button, theme } from "antd";
import Logoimg from "../MNavbar/MLogoimg";
import MenuItem from "../MNavbar/MMenuItem";
import ActionButton from "../Buttons/Button";
import ToggleButton from "../MNavbar/MToggle";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";
import { viewgroups, viewprojects,updateDetails } from "../MentorAuth/Services/Api";
const { Header, Sider, Content } = Layout;

const MDashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [groupdata, setviewgroupdata] = useState(null);
  const [projectdata, setprojectdata] = useState(null);
  const [phasestatus, setphasestatus] = useState(null);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    console.log(1231);
    const fetchgroups = async () => {
      try {
        const data = await viewgroups();
        console.log(data);
        setviewgroupdata(data);
      } catch (error) {}
    };
    fetchgroups();
    const fetchproject = async () => {
      try {
        const data = await viewprojects();

        setprojectdata(data);
        if (data && data.userData && data.userData.length > 0) {
          const completeProjectsCount = data.userData.filter(
            (project) => project.Phase_Status === "uploaded"
          ).length;

          setphasestatus(completeProjectsCount);
        } else {
          console.log("No data fetched or data is empty.");
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchproject();
  }, []);

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
        <Content>
          <div className="flex justify-between gap-4">
            <div className="w-fit h-12 bg-purple-800 m-4 rounded-xl flex items-center  relative px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <GrProjects className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                No.Of Projects : {projectdata && projectdata.userData.length}
              </div>
            </div>
            <div className="w-fit h-12 bg-orange-800 m-4 rounded-xl flex items-center  relative px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <GrProjects className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                Phase Status : {phasestatus}
                {"/"}
                {projectdata && projectdata.userData.length}
              </div>
            </div>
            <div className="w-fit h-12 bg-green-800 m-4 rounded-xl flex items-center  relative px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <GrProjects className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                No.Of Projects : 2
              </div>
            </div>
            <div className="w-fit h-12 bg-blue-800 m-4 rounded-xl flex items-center px-5">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <MdOutlineGroupAdd className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-white">
                No Of Students : {groupdata && groupdata.userData.length}
              </div>
            </div>
            <div className="w-fit h-12 bg-slate-300 m-4 rounded-xl"></div>
          </div>
          <div className="" id="viewgroup table">
            <h3 className="text-lg text-center font-bold uppercase p-1 bg-blue-300 border-b-2 border-blue-700 opacity-50">
              Student Details
            </h3>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sl.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      USN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupdata &&
                    groupdata.userData.map((data, index) => (
                      <tr className="bg-white dark:bg-gray-800" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{data.Project_Name}</td>
                        <td className="px-6 py-4">{data.USN}</td>
                        <td className="px-6 py-4">{data.Name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h3 className="text-lg text-center font-bold uppercase p-1 bg-yellow-100 border-b-2 border-yellow-700 opacity-50">
                Project Details
              </h3>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Project name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project phase
                    </th>
                    <th scope="col" className="px-6 py-3">
                      File Path
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phase status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project marks
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {projectdata &&
                    projectdata.userData.map((data, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data.Project_Name}
                        </th>
                        <td className="px-6 py-4">{data.Project_ID}</td>
                        <td className="px-6 py-4">{data.Project_Phase}</td>
                        <td className="px-6 py-4">{data.File_Path}</td>
                        <td className="px-6 py-4">{data.Phase_Status}</td>
                        <td className="px-6 py-4">{data.Project_Marks}</td>
                        <td className="px-6 py-4"><ActionButton label={"Accept"} onClick={()=> updateDetails(data.Project_ID,1)}/> <br></br> <ActionButton label={"Reject"} onClick={()=> updateDetails(data.Project_ID,0)}/> </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MDashboard;
