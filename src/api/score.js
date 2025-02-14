import axios from "axios";
import request from "@/utils/request";
const app_key = "c5fd77ca40f444f0b5f0911fb4a2e667";
const access_token = "20125463c5d849d485d3032d886ba3fa";
export async function fetchScoreList(
  bil_month,
  sales_phone_number,
  page_num,
  page_size
) {
  return await axios.get("/easy-data-api/eda_dm_locj/score/score_detail_m", {
    headers: {
      version: "v2",
      appKey: app_key,
      apiToken: access_token,
    },
    params: {
      bil_month,
      sales_phone_number,
      page_num,
      page_size,
    },
    timeout: 100000, // 设置超时时间为10秒
  });
}

export async function saveQueryRecords(
  queryUser,
  queryMonth,
  queryPhone,
  recordCount
) {
  return await request({
    method: "POST",
    url: "/query_score/save_record",
    data: {
      queryUser,
      queryMonth,
      queryPhone,
      recordCount,
    },
  });
}
export async function userSendEmail(formData) {
  // 使用axios发送POST请求到后端
  return await request.post("/email/send", formData, {
    headers: {
      // 不需要手动设置'Content-Type'，axios会自动处理
      // 'Content-Type': 'multipart/form-data'
    },
  });
}
