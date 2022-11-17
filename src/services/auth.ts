import axios from "axios";
import axiosInstance from "./auth-interceptors";

class AuthService {
  async login(email: string, password: string) {
    return await axios
      .post("/api/user/login", {
        email,
        password
      })
      .then(response => {        
        if (response.data.data?.accessToken) {                    
          localStorage.setItem("user", JSON.stringify(response.data.data));        
        }
        return response.data;
      });
  }

  // logout() {
  //   localStorage.removeItem("user");
  // }

  async logout() {
    return await axios.post("/api/user/logout");
  }

  async register(name: string, email: string, password: string) {    
    return await axios.post("/api/user/register", {
      name,
      email,
      password
    });
  }

  async changePassword(email: string, password: string) {
    return await axios
      .post("/api/user/changePassword", {
        email,
        password
      })
      .then(response => {
        return response.data;
      });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  async getUserInfo() {
    return await axiosInstance
      .get("/api/user/info")
      .then(response => { 
        
        return response.data;
      });
  }
}

export default new AuthService();
