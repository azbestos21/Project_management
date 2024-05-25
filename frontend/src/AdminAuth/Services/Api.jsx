import axios from "axios";
const baseurl = "http://localhost:3000";

const adminlogin = async (data) => {
  try {
    const response = await axios.post(`${baseurl}/auth/adminlogin`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { adminlogin };
const verify = async (data) => {
  try {
    const response = await axios.post(`${baseurl}/auth/verify`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { verify };

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
  const mentoroption = async () => {
    try {
      const response = await axios.get(`${baseurl}/auth/mentoroption`);
      console.log("Mentor options response:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const projectoption = async () => {
    try {
      const response = await axios.get(`${baseurl}/auth/projectoption`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export {adminmentorlist,adminprojectlist,adminstudentlist,projectoption,mentoroption}


  // Assign Mentor to Student
  const assign = async (mid, pid,Team_ID) => {
    try {
      const response = await axios.post(`${baseurl}/auth/assignmentor`, { mid, pid,Team_ID });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Create New Project
  const newproject = async (projectName, domain) => {
    try {
      const response = await axios.post(`${baseurl}/auth/newproject`, { projectName, domain });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  export { newproject,assign };
  