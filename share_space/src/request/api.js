import request from "@/request/request";
export const Login = async (params) =>
  await request.post("/users/login", params);
