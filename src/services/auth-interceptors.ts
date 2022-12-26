import axios from 'axios';
import AuthService from "./auth";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': authHeader()
  },
});

// const token = localStorage.getItem('accessToken');

axiosInstance.interceptors.response.use(  
  (response: any) => {
    return response;
  },
  async (error: any) => {
    // localStorage.removeItem("user");
    const {
      config,
      response: { status },
    } = error;
    
    const originalRequest = config;        
    if (status === 403) {
      // const accessToken = localStorage.getItem('accessToken');
      // const refreshToken = localStorage.getItem('refreshToken');

      try {
        AuthService.logout()
        .then(
          response => {
            allDelCookies('localhost', '/');
            window.location.reload();
          },
          error => {         
          }
        );
        // const { data } = await axios({
        //   method: 'post',
        //   url: `/members/reissue`,
        //   data: { accessToken, refreshToken },
        // });
        // const newAccessToken = data.data.accessToken;
        // const newRefreshToken = data.data.refreshToken;
        // originalRequest.headers = {
          // 'Content-Type': 'application/json',
          // 'Authorization': authHeader()
        // };
        // localStorage.setItem('ACCESS_TOKEN', newAccessToken);
        // localStorage.setItem('REFRESH_TOKEN', newRefreshToken);
        // return await axios(originalRequest);
      } catch (err: any) {
        new Error(err);
      }
    }
    return Promise.reject(error);
  }
);

// 쿠키 전체 삭제하기
const allDelCookies = (domain: string, path: string) => {
  domain = domain || document.domain;
  path = path || '/';

  const cookies = document.cookie.split('; '); // 배열로 반환
  const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

  // 반목문 순회하면서 쿠키 전체 삭제
  if (!document.cookie) {
  } else {
    for (let i = 0; i < cookies.length; i++) {
      document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
    }
  }
};

export default axiosInstance;