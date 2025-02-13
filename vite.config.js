import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 代理 "/api" 开头的请求到后端接口
      "/easy-data-api": {
        target: "http://134.108.25.70:10073", // 后端接口地址
        changeOrigin: true, // 必须设置为 true 才能支持跨域
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
