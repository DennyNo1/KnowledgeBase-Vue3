import request from "@/utils/request";

export const userLoginService = ({ username, password }) =>
  request.post("/user/login", { username, password });

//查询
export async function userCheckService(username) {
  return await request({
    method: "GET",
    url: "/user/check",
    params: {
      username,
    },
  });
}
//重置密码
export async function userResetService(username,password,safeQuestion,safeAnswer) {
  return await request({
    method: "POST",
    url: "/user/reset",
    data: {
      username,
      password,
      safeQuestion,
      safeAnswer,
    },
  });
}
