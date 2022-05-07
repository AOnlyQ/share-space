import request from "@/request/request";

/**
 * 用户管理
 * */
export const Login = (params) => request.post("/users/login", params);
export const Register = (params) => request.post("/users", params);
export const EditUserInfo = (params) =>
  request.patch(`/users/${params.id}`, params);
export const GetUserInfo = (params) => request.get(`/users/${params.id}`);
/**
 * 自习室管理
 */
// 查找所有自习室
export const GetRoomList = () => request.get("/rooms");
// 查找特定自习室的信息
export const GetRoomInfo = (params) => request.get(`/rooms/${params.id}`);
// 查找特定自习室所有座位状态
export const GetSeatsStatus = (params) =>
  request.post(`/rooms/${params.roomId}/status`, params);

/**
 * 座位管理
 */
// 查找某自习室所有座位

/**
 * 套餐管理
 */
export const GetComboList = () => request.get("/combos");
// 根据id查询套餐详情
export const GetComboInfo = (params) => request.get(`/combos/${params.id}`);

/**
 * 订单管理
 */
// 新增订单
export const AddOrder = (params) =>
  request.post(`/${params.userId}/orders`, params);
// 查找某用户订单
export const GetUserOrderList = (params) =>
  request.get(`/${params._id}/orders`);
/**
 * 预约单管理
 */

// 获取某用户的预约单
export const GetUserReservationList = (params) =>
  request.get(`/${params.userId}/reservations`);
// 新增某用户的预约单
export const AddUserReservation = (params) =>
  request.post(`/${params.userId}/reservations`, params);
