import axios from "axios";

// const API_URL = process.env.API_ROOT + "/api/auth/";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(username: string, password: string) {
    return await axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username: string, email: string, password: string) {
    return await axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
