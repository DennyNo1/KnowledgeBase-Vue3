<script setup>
import Menu from "@/components/Menu.vue";
import { RouterView } from "vue-router";
import Aside from "@/components/Aside.vue";
import Footer from "@/components/Footer.vue";
import Login from "@/components/Login.vue";
import {ref} from 'vue'
const isRegister = ref(true)
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整个表单的校验规则
// 1. 非空校验 required: true      message消息提示，  trigger触发校验的时机 blur change
// 2. 长度校验 min:xx, max: xx
// 3. 正则校验 pattern: 正则规则    \S 非空字符
// 4. 自定义校验 => 自己写逻辑校验 (校验函数)
//    validator: (rule, value, callback)
//    (1) rule  当前校验规则相关的信息
//    (2) value 所校验的表单元素目前的表单值
//    (3) callback 无论成功还是失败，都需要 callback 回调
//        - callback() 校验成功
//        - callback(new Error(错误信息)) 校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        
        <Menu />
        
      </el-header>
      <el-container>
        <el-aside width="25vw">
          <Aside />
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <Login />
  </div>

  <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>



  <!--  <el-backtop :right="100" :bottom="100" />-->
</template>

<style scoped>
.common-layout {
  height: 100%;
}
.el-aside {
  max-width: 300px;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
/* .el-header {
  background-color: #aaa;
}
.el-aside {
  background-color: #999;
} */

/* .el-main {
  background-color: #555;
}
.el-footer {
  background-color: #333;
}*/

.el-main {
  overflow: auto; /* 如果内容过多，添加滚动条 */
}
</style>
