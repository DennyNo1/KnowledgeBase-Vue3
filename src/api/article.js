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

export async function useraddArticleService(uploaderId, type, title, content) {
  return await request({
    method: "POST",
    url: "/article/add",
    data: {
      uploaderId,
      type,
      title,
      content,
    },
  });
}

export async function useraddAttachmentService(articleId, url, alt, href) {
  return await request({
    method: "POST",
    url: "/article/save_attachment",
    data: {
      articleId, url, alt, href
    },
  });
}