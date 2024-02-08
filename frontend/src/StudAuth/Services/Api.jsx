import axios from "axios"
const baseurl = "http://localhost:3000"

const studentlogin= async (data)=>{
    try {
        const response = await axios.post(
            `${baseurl}/auth/studentlogin`,data
        )
        return response.data
    } catch (error) {
        throw error
    }
}
export{
    studentlogin
}
