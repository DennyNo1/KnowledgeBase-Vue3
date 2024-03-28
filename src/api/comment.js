import request from "@/utils/request";
export async function userCommentAndReplyService(belongType, belongId,userId) {
  return await request({
    method: "GET",
    url: "/comment",
    params: {
      belongType,
      belongId,
      userId
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

//点赞评论（回答）
export const userLikeService = (userId,belongType,belongId) =>
  request.post("/like", { userId, belongType, belongId });

