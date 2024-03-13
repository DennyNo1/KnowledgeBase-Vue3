// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入Pinia
import { createPinia } from 'pinia'

// 引入ui组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-ui/lib/theme-chalk/index.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(pinia)
app.use(router)
// 使用ui组件库
app.use(ElementPlus, {
    locale: zhCn,
})

app.mount('#app')
