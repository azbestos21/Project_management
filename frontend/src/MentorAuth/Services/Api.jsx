import axios from "axios";
const baseurl = "https://project-management-4.onrender.com";

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
const updateDetails = async (pid, action) => {
  console.log(pid);
  try {
    if (action === 1) {
      try {
        const response = await axios.post(`${baseurl}/auth/acceptproject`, {
          pid,
        });
        window.location.reload();
        return true;
      } catch (err) {
        throw err;
      }
    } else if (action === 0) {
      try {
        const response = await axios.post(`${baseurl}/auth/rejectproject`, {
          pid,
        });
        window.location.reload();
        return true;
      } catch (err) {
        throw err;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { viewprojects, updateDetails };

const domainproject = async (data) => {
  try {
    const res = await axios.post(`${baseurl}/auth/searchdomain`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { domainproject };

const mentordetails = async () => {
  try {
    const token = localStorage.getItem("Mentortoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${baseurl}/auth/mentormentor`, config);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { mentordetails };
