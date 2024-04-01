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