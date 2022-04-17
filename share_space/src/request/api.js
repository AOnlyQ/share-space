import request from "@/request/request";
export const Login = () => request.post("/users/login");
