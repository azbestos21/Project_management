import axios from "axios";
import { message } from "antd";
//const baseurl = "https://project-management-4.onrender.com";
const baseurl = "http://ec2-3-6-18-59.ap-south-1.compute.amazonaws.com:3000";
const adminlogin = async (data) => {
  try {
    const response = await axios.post(`${baseurl}/auth/adminlogin`, data);

    message.success("Login Successful");
    return response.data;
  } catch (error) {
    message.error("Login Unsuccessful");
    throw error;
  }
};
export { adminlogin };

const adminsignup = async (data) => {
  try {
    console.log(data);
    const res = await axios.post(`${baseurl}/auth/adminregister`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { adminsignup };
const adminprojectlist = async () => {
  try {
    const response = await axios.get(`${baseurl}/auth/adminprojectlist`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Admin Mentor List
const adminmentorlist = async () => {
  try {
    const response = await axios.get(`${baseurl}/auth/adminmentorlist`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const adminstudentlist = async () => {
  try {
    const response = await axios.get(`${baseurl}/auth/adminstudentlist`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const verifyadmin = async (token) => { // Accept token as a parameter
  try {
    const response = await axios.get(`${baseurl}/auth/verifyadmin?token=${token}`); // Send token in the URL query string
    return response.data;
  } catch (error) {
    throw error;
  }
};


export { adminmentorlist, adminprojectlist, adminstudentlist , verifyadmin };

// Assign Mentor to Student
const assignmentor = async (mid, pid) => {
  try {
    const response = await axios.post(`${baseurl}/auth/assignmentor`, {
      mid,
      pid,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create New Project
const newproject = async (projectName, domain) => {
  try {
    const response = await axios.post(`${baseurl}/auth/newproject`, {
      projectName,
      domain,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { assignmentor, newproject };
