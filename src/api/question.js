import request from "@/utils/request";

export async function userOneQuestionService(questionId) {
  return await request({
    method: "GET",
    url: "/question",
    params: {
      questionId,
    },
  });
}

export const userCheckService = (questionId, isChecked, assignTo) =>
  request.post("/question/check", { questionId, isChecked, assignTo });

export const userQuestionAddService = (questionerId, title, content, type) =>
  request.post("/question/add", { questionerId, title, content, type });

//下面两个函数实际用的是一个接口。这个的参数列表是严格按照顺序的，和名称没关系
export async function userQuestionListService(
  page,
  pageSize,
  queryName,
  type,
  isChecked,
  isSolved,
  assignTo
) {
  return await request({
    method: "GET",
    url: "/question/some",
    params: {
      page,
      pageSize,
      queryName,
      type,
      isChecked,
      isSolved,
      assignTo,
    },
  });
}

// export async function userQuestionWithoutCommentListService(
//   page,
//   pageSize,
//   type,
//   assignTo
// ) {
//   return await request({
//     method: "GET",
//     url: "/question/some",
//     params: {
//       page,
//       pageSize,
//       type,
//       assignTo,
//     },
//   });
// }

//处理是否有待处理的问题
//下面两个函数实际用的是一个接口。这个的参数列表是严格按照顺序的，和名称没关系
export async function QuestionWaitService(role) {
  return await request({
    method: "GET",
    url: "/question/wait",
    params: {
      role,
    },
  });
}
