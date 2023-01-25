import axios from 'axios';
import authHeader from './auth-header';

//로컬
const API_URL = 'http://localhost:8080/api/call/';
//운영
// const API_URL = 'https://fordd.fly.dev/api/call/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
