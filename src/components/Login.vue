<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router"; //用于页面跳转
import { useLoginStore } from "@/store/login.js";
import { storeToRefs } from "pinia";

import { User, Unlock } from "@element-plus/icons-vue";

import {
  userCheckService,
  userLoginService,
  userResetService,
  userGetVerificationCode,
  userLoginByVerificationCode,
} from "@/api/user";
import { ElMessage } from "element-plus";
import { encryptData, decryptData } from "@/utils/encrypt.js";
const loginStore = useLoginStore();
const isLogin = ref(true);
const { userInfo, isLoggedIn, isOpen, cookie, isSet } = storeToRefs(loginStore);

// 获取login仓库实例

//登录表单的数据
const loginForm = ref({
  // username: "",
  // password: "",
  phone: "",
  code: "",
});

// 登录表单的对象
const loginFormRef = ref();

const loginRules = reactive({
  phone: [
    { required: true, message: "手机号不能为空！", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/, // 修改为匹配中国大陆手机号的正则表达式
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: "blur" },
    {
      len: 6, // 验证码固定长度为6
      message: "验证码必须是6位字符",
      trigger: "blur",
    },
    {
      pattern: /^\d{6}$/, // 确保验证码是6位数字
      message: "验证码必须是6位数字",
      trigger: "blur",
    },
  ],
});

//登录按钮
const login = async () => {
  // 1. 对表单进行校验
  await loginFormRef.value.validate();
  //对密码进行加密处理

  const res = await userLoginByVerificationCode(loginForm.value);
  console.log(res);
  //登录失败
  if (res.code != 200) {
    ElMessage.error(res.msg);
  }
  //登录成功
  else {
    ElMessage.success(res.msg);
    //关闭窗口。数据应该不用清楚吧。
    loginStore.isOpen = false;
    //存用户信息到pinia
    console.log(res.data.userInfo);
    loginStore.userInfo = res.data.userInfo;
    loginStore.jwt = res.data.jwt;
    loginStore.isLoggedIn = true;
    clearForm();
  }
};

// 整个的用于提交的form数据对象
const formModel = ref({
  username: "",
  password: "",
  repassword: "",
  nickName: "",
  phone: "",
  location: "",
  department: "",
  sale: "",
  safeQuestion: "",
  safeAnswer: "",
});

function clearForm() {
  Object.keys(loginForm.value).forEach((key) => {
    loginForm.value[key] = "";
  });
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = "";
  });
  isLogin.value = true;
}

// 定义倒计时状态
const countdown = ref(0);
const isCounting = ref(false);

// 计算按钮显示的文本
const buttonText = computed(() => {
  return isCounting.value ? `${countdown.value}秒后重新获取` : "获取验证码";
});

// 处理获取验证码的逻辑
const handleGetCode = async () => {
  try {
    await loginFormRef.value.validateField("phone");
    console.log("Phone validation passed");
    if (isCounting.value) return; // 如果正在倒计时，则不再触发

    console.log(loginForm.value.phone);
    // 模拟发送验证码请求
    await userGetVerificationCode(loginForm.value.phone);

    // 开始倒计时
    isCounting.value = true;
    countdown.value = 60;

    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer); // 清除定时器
        isCounting.value = false; // 重置状态
      }
    }, 1000);
  } catch (error) {
    console.error("Phone validation failed:", error);
  }
};
</script>

<!-- 模板 -->
<template>
  <!-- <SetPassword></SetPassword> -->
  <el-dialog
    v-model="isOpen"
    width="30%"
    style="border-radius: 0.75rem"
    center
    @closed="clearForm"
  >
    <!--登录表单-->
    <el-form
      v-if="isLogin"
      class="form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      size="large"
      autocomplete="off"
    >
      <div class="head">
        <el-text size="large" tag="b" type="primary">登录</el-text>
      </div>

      <el-form-item prop="phone">
        <el-input
          :prefix-icon="User"
          v-model="loginForm.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          :prefix-icon="Unlock"
          v-model="loginForm.code"
          placeholder="请输入验证码"
        >
          <template #append>
            <el-button
              @click="handleGetCode"
              :disabled="isCounting"
              :style="{
                backgroundColor: 'var(--el-color-primary)',
                borderColor: 'var(--el-color-primarys)',
                color: 'white',
              }"
            >
              {{ buttonText }}</el-button
            >
          </template>
        </el-input>
      </el-form-item>
      <!-- <div class="navigate-to-register">
        <el-link type="primary" >为提升安全性，仅支持短信登录</el-link>
      </div> -->
      <div class="dialog-footer" style="margin-bottom: 1rem">
        <el-button
          type="primary"
          size="large"
          @click="login"
          :style="{ width: '100%' }"
          >登录</el-button
        >
      </div>
    </el-form>
    <!--账号密码登录-->

    <!-- <el-form-item prop="username">
        <el-input
          :prefix-icon="User"
          v-model="loginForm.username"
          placeholder="请输入手机号/用户名"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="loginForm.password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>



      <div class="navigate-to-register">
        <el-link type="primary" @click="navigateToCheck">忘记密码？</el-link>
      </div>


    <!-- 确认用户名表单 -->
    <!-- <el-form
      :model="formModel"
      :rules="rules"
      ref="repasswordFormRef"
      size="large"
      autocomplete="off"
      class="form"
      v-if="isCheck"
    >
      <div class="head">
        <el-text size="large" tag="b" type="primary">重置密码</el-text>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="formModel.username"
          :prefix-icon="User"
          placeholder="请输入手机号/用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="checkUsername"
          class="button"
          type="primary"
          auto-insert-space
          :style="{ width: '100%' }"
          size="large"
        >
          确认
        </el-button>
      </el-form-item>
s
    </el-form> -->

    <!--重置密码表单-->
    <!-- <el-form
      :model="formModel"
      :rules="rules"
      ref="form"
      size="large"
      autocomplete="off"
      class="form"
      v-if="isReset"
    >
      <div class="head">
        <el-text size="large" tag="b" type="primary">重置密码</el-text>
      </div>

      <el-form-item>
        安全问题：
        <el-input v-model="formModel.safeQuestion" disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="safeAnswer">
        <el-input
          v-model="formModel.safeAnswer"
          :prefix-icon="ChatDotRound"
          placeholder="请输入安全问题的答案"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          :prefix-icon="Lock"
          type="password"
          placeholder="请输入新密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          v-model="formModel.repassword"
          :prefix-icon="Lock"
          type="password"
          placeholder="请再次输入新密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="reset"
          class="button"
          type="primary"
          auto-insert-space
          :style="{ width: '100%' }"
          size="large"
        >
          重置
        </el-button>
      </el-form-item>
      <div class="navigate-to-register">
        <el-link type="primary"
          >如有问题请联系慧问工作室徐慧15305809539</el-link
        >
      </div>
    </el-form> -->
  </el-dialog>
</template>

<style scoped>
.el-button[disabled] {
  opacity: 0.7; /* 禁用时降低透明度 */
  cursor: not-allowed; /* 禁用时显示禁止光标 */
}
.el-text--large {
  font-size: 22px; /* 调整为适合的大小 */
}

.choose {
  margin-top: 20px;
  user-select: none;
}

.login-form {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: center;
}

.navigate-to-register {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: right;
}
.dialog-footer {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: center;
}
.form {
  width: 80%;
  margin: auto;
}

.head {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.return {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: right;
}
</style>
