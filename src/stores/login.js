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

import { defineStore } from 'pinia'
import { ref } from "vue";

export const useLoginStore = defineStore('loginStore', () => {
    const userInfo = ref({
        userId: '',
        username: '',
        nickname: '',
        phone: '',
        role: '',
        location: '',
        department: '',
    })
    const isLoggedIn = ref(false)
    const isOpen = ref(true)
    const cookie = ref('')


    return { userInfo, isLoggedIn, isOpen, cookie }
})