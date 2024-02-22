import axios from "axios";
const baseurl = "http://localhost:3000";

const studentlogin = async (data) => {
  try {
    const response = await axios.post(`${baseurl}/auth/studentlogin`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { studentlogin };

const studentsignup = async (data) => {
  try {
    const res = await axios.post(`${baseurl}/auth/studentregister`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { studentsignup };

const studentproject = async () => {
  try {
    const token = localStorage.getItem("studenttoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${baseurl}/auth/studentproject`, config);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { studentproject };

const projectregister = async (data) => {
  try {
    const token = localStorage.getItem("studenttoken");
    console.log("token = ", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${baseurl}/auth/projectregister?projectTitle=${data}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { projectregister };

const studentteam = async () => {
  try {
    const token = localStorage.getItem("studenttoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${baseurl}/auth/studentteam`, config);
    console.log(res);
    return res.data;
  } catch (error) {}
};

const uploadFile = async (formData) => {
  try {
    const token = localStorage.getItem("studenttoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${baseurl}/auth/studentupload`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { studentteam, uploadFile };
