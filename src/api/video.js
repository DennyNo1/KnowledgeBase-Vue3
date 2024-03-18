import request from "@/utils/request";
export async function userVideoListService(page, pageSize, queryName, type) {
  return await request({
    method: "GET",
    url: "/video/some",
    params: {
      page,
      queryName,
      pageSize,
      type,
    },
  });
}
