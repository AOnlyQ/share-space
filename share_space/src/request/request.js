import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});
// 请求拦截器,在发起请求前执行
instance.interceptors.request.use(
  (config) => {
    // if()

    config.headers.Authorization =
      "Bearer " + window.sessionStorage.getItem("token");
    // 方便测试，后面记得改
    // config.headers.Authorization =
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUxODcwNDRkNzFjN2Q5ODkyMTExOWEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjUxNTQ3NDQyLCJleHAiOjE2NTE2MzM4NDJ9.SAnREOBODINgakI3UXzFqKlfDgPzMvFbyrtsay0DIHg";

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
