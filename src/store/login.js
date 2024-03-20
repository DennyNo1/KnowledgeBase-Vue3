// setup store
// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions
// export const useCounterStore = defineStore('counter', () => {
//     const count = ref(0)
//     const doubleCount = computed(() => count.value * 2)
//     function increment() {
//         count.value++
//     }
//
//     return { count, doubleCount, increment }
// })

import { defineStore } from 'pinia'; // 从pinia库导入defineStore函数，用于定义一个状态存储仓库
import { ref } from "vue"; // 从Vue库中导入ref函数，用来创建响应式数据

// 定义名为useLoginStore的store工厂函数，它将会返回一个包含状态和方法的对象
export const useLoginStore = defineStore('loginStore', () => {
    // 创建一个响应式的userInfo对象，存储用户信息，初始值为各个属性为空字符串或默认值
    const userInfo = ref({
        id: '',
        username: '',
        nickname: '',
        phone: '',
        role: '',
        location: '',
        department: '',
    })

    // 创建一个响应式的isLoggedIn布尔变量，表示用户是否已登录，默认为false
    const isLoggedIn = ref(false)

    // 创建一个响应式的isOpen布尔变量，控制登录对话框或其他组件的打开/关闭状态，默认为true（即初始化时打开）
    const isOpen = ref(true)

    // 创建一个响应式的cookie字符串变量，用来存储用户的会话或身份验证相关cookie信息，默认为空字符串
    const cookie = ref('')

    // 返回这个store需要暴露给外部使用的所有状态和属性
    return { userInfo, isLoggedIn, isOpen, cookie }
});