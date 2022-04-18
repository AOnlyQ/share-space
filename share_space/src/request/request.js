import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});
// 请求拦截器,在发起请求前执行
instance.interceptors.request.use(
  (config) => {
    // if()
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截器，在接收到响应前执行
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
