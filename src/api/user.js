import request from "@/utils/request";

export const userLoginrService = ({ username, password }) =>
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
