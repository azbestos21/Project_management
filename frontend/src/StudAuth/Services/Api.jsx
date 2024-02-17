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
