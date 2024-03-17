import request from "@/utils/request";
// 注册接口
export const userRegisterService = ({
  username,
  password,
  nickName,
  phone,
  location,
  department,
}) =>
  request.post("/user/register", {
    username,
    password,
    nickName,
    phone,
    location,
    department,
  });
export const userLoginrService = ({ username, password }) =>
  request.post("/user/login", { username, password });
