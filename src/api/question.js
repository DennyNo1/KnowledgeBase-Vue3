import request from "@/utils/request";
export async function userQuestionListService(page, pageSize, queryName, isChecked) {
  return await request({
    method: "GET",
    url: "/question/some",
    params: {
      page,
      queryName,
      pageSize,
      isChecked,
    },
  });
}

export const userCheckService = ( questionId, isChecked ) =>
  request.post("/question/check", { questionId, isChecked });