import request from "@/request/request";

/**
 * 用户管理
 * */
export const Login = (params) => request.post("/users/login", params);
export const Register = (params) => request.post("/users", params);
/**
 * 自习室管理
 */
export const GetRoomList = () => request.get("/rooms");
