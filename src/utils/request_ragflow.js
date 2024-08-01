import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://172.27.20.24/v1/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// 添加请求拦截器
apiClient.interceptors.request.use(
    config => {
      // 获取 API key
      const apiKey = 'ragflow-lmMTIyMTk0NDI1YjExZWY4YzYzMDI0Mm';
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