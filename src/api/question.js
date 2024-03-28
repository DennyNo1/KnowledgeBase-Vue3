import request from "@/utils/request";


export async function userOneQuestionService(
  questionId,
  

) {
  return await request({
    method: "GET",
    url: "/question",
    params: {
      questionId,
     

    },
  });
}

export const userCheckService = (questionId, isChecked) =>
  request.post("/question/check", { questionId, isChecked });


export const userQuestionAddService = (questionerId, title, content,type) =>
  request.post("/question/add", { questionerId, title, content,type });



  export async function userQuestionListService(
    page,
    pageSize,
    queryName,
    isChecked,
    type
  ) {
    return await request({
      method: "GET",
      url: "/question/some",
      params: {
        page,
        queryName,
        pageSize,
        isChecked,
        type
      },
    });
  }
