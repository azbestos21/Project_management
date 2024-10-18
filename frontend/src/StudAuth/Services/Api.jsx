import axios from "axios";
const baseurl = "https://ec2-13-232-5-103.ap-south-1.compute.amazonaws.com:3000";

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
    console.log(data);
    const res = await axios.post(`${baseurl}/auth/studentregister`, data);
    console.log(res.data);
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

const mentorlist = async () => {
  try {
    const res = await axios.get(`${baseurl}/auth/mentorlist`);

    return res;
  } catch (error) {
    throw error;
  }
};

export { mentorlist };
const mentorinfo = async () => {
  try {
    const token = localStorage.getItem("studenttoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${baseurl}/auth/studentmentor`, config);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { mentorinfo };

const registerteam = async (data) => {
  try {
    console.log(data);
    const token = localStorage.getItem("studenttoken");
    const Arraydata = {
      teammates: [
        {
          usn: data.usn,
          name: data.name,
          email: data.mail,
        },
      ],
    };
    console.log(Arraydata);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${baseurl}/auth/teamregister`,
      Arraydata,
      config
    );
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { registerteam };
