import axios from "axios";

// const API_URL = process.env.API_ROOT + "/api/auth/";
// const API_URL = "http://localhost:8080/api/user/";

class AuthService {
  async login(email: string, password: string) {
    return await axios
      .post("/api/user/login", {
        email,
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

  async register(name: string, email: string, password: string) {
    return await axios.post("/api/user/register", {
      name,
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
