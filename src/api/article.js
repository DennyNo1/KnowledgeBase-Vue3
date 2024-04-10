import request from "@/utils/request";
export async function userArticleListService(page, pageSize, queryName, type) {
  return await request({
    method: "GET",
    url: "/article/some",
    params: {
      page,
      queryName,
      pageSize,
      type,
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

export async function useraddArticleService(uploaderId, type, title, content,top) {
  return await request({
    method: "POST",
    url: "/article/add",
    data: {
      uploaderId,
      type,
      title,
      content,
      top
    },
  });
}

export async function useraddAttachmentService(articleId, url, alt, href) {
  return await request({
    method: "POST",
    url: "/article/save_attachment",
    data: {
      articleId,
      url,
      alt,
      href,
    },
  });
}


export async function userModifyTopService(id, top) {
  return await request({
    method: "POST",
    url: "/article/top",
    data: {
      id,
      top,
    },
  });
}
