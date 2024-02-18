import axios from "axios";
const baseurl = "http://localhost:3000";

const mentorlogin = async (data) => {
  try {
    const res = axios.post(`${baseurl}/auth/login`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { mentorlogin };
