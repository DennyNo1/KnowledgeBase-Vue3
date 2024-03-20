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
export async function useraddVideoService(type, uploaderId, title, url) {
  return await request({
    method: "POST",
    url: "/video/add",
    data: {
      type,
      uploaderId,
      title,
      url,
    },
  });
}

export async function userOneVideoService(videoId, userId) {
  return await request({
    method: "GET",
    url: "/video",
    params: {
      videoId,
      userId,
    },
  });
}
