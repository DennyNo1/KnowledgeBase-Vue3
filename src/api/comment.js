import request from "@/utils/request";
export async function userCommentAndReplyService(belongType, belongId) {
  return await request({
    method: "GET",
    url: "/comment",
    params: {
      belongType,
      belongId,
    },
  });
}
export async function useraddCommentService(belongType,belongId, userId, content) {
  return await request({
    method: "POST",
    url: "/comment/add",
    data: {
      belongType,
      belongId,
      userId,
      content,
    },
  });
}

export async function useraddReplyService(content,userId, commentId, secondReplyName) {
  return await request({
    method: "POST",
    url: "/reply/add",
    data: {
      content,
      userId,
      commentId,
      secondReplyName,
    },
  });
}
