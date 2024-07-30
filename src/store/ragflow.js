import { defineStore } from "pinia"; // 从pinia库导入defineStore函数，用于定义一个状态存储仓库
import { ref } from "vue"; // 从Vue库中导入ref函数，用来创建响应式数据
export const useRagflowStore = defineStore("RagflowStore", () => {
  // 创建一个响应式的userInfo对象，存储用户信息，初始值为各个属性为空字符串或默认值
  const conversationInfo = ref({
    id: "",
  });

  return { conversationInfo };
});
