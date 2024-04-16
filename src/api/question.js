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

export const userCheckService = (questionId, isChecked,assignedTo) =>
  request.post("/question/check", { questionId, isChecked,assignedTo });


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

  export async function userQuestionWithoutCommentListService(
    page,
    pageSize,
    type,
    assignedTo
  ) {
    return await request({
      method: "GET",
      url: "/question/some",
      params: {
        page,
        pageSize,
        type,
        assignedTo
      },
    });
  }


