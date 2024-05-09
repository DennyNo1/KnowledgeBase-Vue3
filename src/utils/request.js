import axios from "axios";
import { ElMessage } from "element-plus";
import { Session } from "./storage";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login.js";

const request = axios.create({
  // 开发环境
  baseURL: "http://localhost:8088",

  //生产环境

  timeout: 10000,
  // headers: {
  //     'Content-Type': 'application/json',
  // },
});

//以下目前没什么用了，权限控制不需要用到拦截器

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const loginStore = useLoginStore();
    // 在发送请求之前做些什么
    // 常用于判断是否为登录状态

    if (loginStore.jwt) {
      config.headers.Authorization = `Bearer ${loginStore.jwt}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error); // 打印错误信息
    // 对响应错误做点什么
    if (error.code === "ERR_BAD_REQUEST") {
      // `token` 过期或者账号已在别处登录
      ElMessage({
        message: "您的账号登录过期或在别处登录！",
        type: "error",
      });
      Session.clear();
      // 清除登录信息
      const store = useLoginStore();
      const { userInfo, isLoggedIn, isOpen, cookie } = storeToRefs(store);
      isLoggedIn.value = false;
      isOpen.value = true;
      userInfo.value.userId = "";
      userInfo.value.username = "";
      userInfo.value.nickname = "";
      userInfo.value.phone = "";
      userInfo.value.role = "";
      userInfo.value.location = "";
      userInfo.value.department = "";
      cookie.value = "";
    }

    // if (error.message.indexOf('timeout') !== -1) {
    //     console.log('网络超时');
    //     ElMessage({
    //         message: '网络超时',
    //         type: 'warning'
    //     })
    // } else if (error.message === 'Network Error') {
    //     console.log('网络连接错误');
    //     ElMessage({
    //         message: '网络连接错误',
    //         type: 'warning'
    //     })
    // } else if (error.message === 'Request failed with status code 401') {
    //     console.log('账号或密码输入错误');
    //     ElMessage({
    //         message: '账号或密码输入错误',
    //         type: 'warning'
    //     })
    // } else {
    //     if (error.response.data) console.log(error.response.statusText);
    //     else console.log('接口路径找不到');
    //     ElMessage({
    //         message: '接口路径找不到',
    //         type: 'warning'
    //     })
    // }
    return Promise.reject(error);
  }
);

export default request;
