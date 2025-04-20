import request from "@/utils/request";
export const importTable = (table) =>
  request.post("/smart_eng_score/import", { table });
