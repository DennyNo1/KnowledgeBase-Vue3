import request from "@/utils/request";

//获取短信验证码，用于新的登录方式
export async function userGetVerificationCode(phone) {
  return await request.post("/sms/code", {
    phone,
  });
}

export const userLoginByVerificationCode = ({ phone, code }) =>
  request.post("/sms/login", { phone, code });

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
export async function userResetService(
  username,
  password,
  safeQuestion,
  safeAnswer
) {
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
