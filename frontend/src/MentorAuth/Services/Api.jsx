import axios from "axios";
const baseurl = "http://localhost:3000";

const mentorlogin = async (data) => {
  try {
    const response = await axios.post(`${baseurl}/auth/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { mentorlogin };
const mentorregister = async (data) => {
  try {
    const res = await axios.post(`${baseurl}/auth/register`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { mentorregister };

const viewgroups = async () => {
  try {
    const token = localStorage.getItem("Mentortoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseurl}/auth/viewgroups`, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { viewgroups };

const viewprojects = async () => {
  try {
    const token = localStorage.getItem("Mentortoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseurl}/auth/viewprojects`, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { viewprojects };
