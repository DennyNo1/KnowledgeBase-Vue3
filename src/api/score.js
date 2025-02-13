import axios from "axios";
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
