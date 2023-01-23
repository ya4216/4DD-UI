import Axios from 'axios';
import { useAsync } from 'react-async';

const custom = async (props: any) => {
  // const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  try {
    const res = await Axios({
      method: props.props.method || 'get',
      url: props.props.url,
    });

    return res.data.data;
  } catch (err) {
    console.log('error!!! : ', err);
    return err;
  }
};

const customAxios = (props: any) => {
  const {
    data: list,
    error,
    isLoading,
  } = useAsync({
    promiseFn: custom,
    props,
  });

  if (isLoading) return null;
  if (error) return null;
  if (!list) return null;

  return list;
};

export default customAxios;

// JSON.parse(localStorage.getItem('user')).accessToken

// import axios, { AxiosInstance } from 'axios';
// import {useCookies} from 'react-cookie'

// export const customAxios = axios.create({
//   baseURL: '/api', // 기본 서버 주소 입력
//   headers: {
//localStorage.user 바꿔야함.
//     access_token: JSON.parse(localStorage.user).accessToken,
//   },
// });

// import axios from 'axios';

// const customAxios = axios.create();

// export default customAxios;
