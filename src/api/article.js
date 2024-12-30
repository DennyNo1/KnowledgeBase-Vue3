import request from "@/utils/request";
export async function userArticleListService(
  page,
  pageSize,
  queryName,
  type,
  uploaderId
) {
  return await request({
    method: "GET",
    url: "/article/some",
    params: {
      page,
      queryName,
      pageSize,
      type,
      uploaderId,
    },
  });
}

export async function userOneArticleService(articleId, userId) {
  return await request({
    method: "GET",
    url: "/article",
    params: {
      articleId,
      userId,
    },
  });
}

export async function userArticleLikeService(articleId, userId) {
  return await request({
    method: "GET",
    url: "/like/article",
    params: {
      articleId,
      userId,
    },
  });
}

export async function useraddArticleService(
  uploaderId,
  type,
  title,
  content,
  top
) {
  return await request({
    method: "POST",
    url: "/article/add",
    data: {
      uploaderId,
      type,
      title,
      content,
      top,
    },
  });
}

export async function useraddAttachmentService(articleId, url, name, uid) {
  return await request({
    method: "POST",
    url: "/article/save_attachment",
    data: {
      articleId,
      url,
      name,
      uid,
    },
  });
}

// export async function userModifyTopService(id, top) {
//   return await request({
//     method: "POST",
//     url: "/article/top",
//     data: {
//       id,
//       top,
//     },
//   });
// }

export async function userupdateAttachmentService(articleId, url, name, uid) {
  return await request({
    method: "POST",
    url: "/article/update_attachment",
    data: [
      {
        articleId,
        url,
        name,
        uid,
      },
    ],
  });
}
export async function userUpdateArticleService(
  id,
  uploaderId,
  type,
  title,
  content,
  top
) {
  return await request({
    method: "POST",
    url: "/article/update",
    data: {
      id,
      uploaderId,
      type,
      title,
      content,
      top,
    },
  });
}

export async function userDeleteAllAttachmentService(articleId) {
  return await request({
    method: "POST",
    url: "/article/delete_attachment",
    data: {
      articleId,
    },
  });
}

export async function userDeleteArticleService(id) {
  return await request({
    method: "DELETE",
    url: "/article/delete",
    data: {
      id,
    },
  });
}

export async function articleSearchListService(page, pageSize, queryName) {
  return await request({
    method: "GET",
    url: "/article/some",
    params: {
      page,
      pageSize,
      queryName,
    },
  });
}
export async function articleSearchUploaderService(
  page,
  pageSize,
  queryUploader
) {
  return await request({
    method: "GET",
    url: "/article/some",
    params: {
      page,
      pageSize,
      queryUploader,
    },
  });
}

export async function articleRankService() {
  return await request({
    method: "GET",
    url: "/article/year_rank",
  });
}
