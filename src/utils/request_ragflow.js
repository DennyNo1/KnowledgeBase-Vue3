import axios from 'axios';

const apiClient = axios.create({
  baseURL:  import.meta.env.VITE_RAGFLOW_API_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// 添加请求拦截器
apiClient.interceptors.request.use(
 
    config => {

      // 获取 API key
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  export default apiClient;