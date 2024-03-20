import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, theme } from "antd";
import Logoimg from "../Navbar/Logoimg";
import MenuItem from "../Navbar/MenuItem";
import ToggleButton from "../Navbar/ToggleButton";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { uploadFile } from "../StudAuth/Services/Api.jsx";

import { studentproject } from "../StudAuth/Services/Api.jsx";
const { Header, Sider, Content } = Layout;
const Sprojects = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [details, setProjectdetails] = useState(null);
  const [file, setFile] = useState(null);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    console.log(123);
    const fetchdetails = async () => {
      try {
        const data = await studentproject();
        console.log("d=", data);
        setProjectdetails(data);
      } catch (error) {}
    };
    fetchdetails();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", file);

    try {
      const result = await uploadFile(formData);
      console.log("Upload successful:", result);
      window.location.reload();
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
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
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h3 className="text-lg text-center font-bold uppercase p-1 bg-yellow-100 border-b-2 border-yellow-700 opacity-80">
              Project Details
            </h3>
            <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-gray-400">
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
                </tr>
              </thead>
              <tbody>
                {details &&
                  details.userData.map((data, index) => (
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
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>
              <form onSubmit={submitHandler}>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 bg-white border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      onChange={handleFileChange}
                      name="excelFile"
                      className="w-fit block bg-transparent text-xs"
                      accept=".xlsx, .xls"
                      required
                    />
                  </label>
                </div>
                <div className="flex item-center mt-3">
                  <button
                    className="w-32 mr-auto mt-auto mb-3 ml-auto text-center p-4 bg-blue-300 rounded-full  border-2 border-black hover:bg-white "
                    type="submit"
                  >
                    ADD FILES
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sprojects;
