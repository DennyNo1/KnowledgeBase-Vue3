<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router"; //用于页面跳转
import { useLoginStore } from "@/store/login.js";
import { storeToRefs } from "pinia";

import {
  User,
  Lock,
  Iphone,
  OfficeBuilding,
  Location,
  UserFilled,
  ChatDotRound,
  Notebook,
} from "@element-plus/icons-vue";
import { ArrowDown } from "@element-plus/icons-vue";
import {
  userCheckService,
  userLoginService,
  userResetService,
} from "@/api/user";
import { ElMessage } from "element-plus";
import { encryptData, decryptData } from "@/utils/encrypt.js";
const loginStore = useLoginStore();
const isLogin = ref(true);
const { userInfo, isLoggedIn, isOpen, cookie } = storeToRefs(loginStore);

// 获取router实例
const router = useRouter();

// 获取login仓库实例

// 登录表单切换到注册表单
function navigateToRegister() {
  isLogin.value = false;
}

function navigateToLogin() {
  //先打开登录页面
  isLogin.value = true;
  isCheck.value = false;
  isReset.value = false;
  //清空重置表单
  Object.keys(formModel).forEach((key) => {
    formModel[key] = "";
  });
}

//登录表单的数据
const loginForm = ref({
  username: "",
  password: "",
  // phone: "",
  // validCode: "",
});

// 登录表单的对象
const loginFormRef = ref();

const loginRules = reactive({
  username: [
    { required: true, message: "用户名不能为空！", trigger: "blur" },
    {
      min: 4,
      max: 11,
      message: "用户名必须是 4-11位 的字符数字",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是 6-15位 的非空字符",
      trigger: "blur",
    },
  ],
});

//登录按钮
const login = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await loginFormRef.value.validate();
  //对密码进行加密处理
  loginForm.value.password = encryptData(loginForm.value.password);

  const res = await userLoginService(loginForm.value);
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
    loginStore.userInfo = res.data.userInfo;
    loginStore.jwt = res.data.jwt;
    loginStore.isLoggedIn = true;
    clearForm();
    const userPassword = decryptData(res.data.userInfo.password);
    // console.log(userPassword)
    if (userPassword == "Dx123456") {
      isOpen.value = true;
      isLogin.value = false;
      isModify.value = true;
    }
  }
};

//注册表单的对象、变量、函数
const form = ref();
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
  // 正常来说，这里还有一个用户名重复检测
  username: [
    { required: true, message: "用户名不能为空！", trigger: "blur" },
    {
      min: 4,
      max: 11,
      message: "用户名必须是 4-11位 的字符数字",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是 6-15位 的非空字符",
      trigger: "blur",
    },
  ],
  repassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是 6-15位 的非空字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback(); // 就算校验成功，也需要callback
        }
      },
      trigger: "blur",
    },
  ],
  safeAnswer: [
    { required: true, message: "请输入安全问题答案", trigger: "blur" },
  ],
};

const reset = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await form.value.validate();
  console.log(formModel.value.password);
  const response = await userResetService(
    formModel.value.username,
    encryptData(formModel.value.password),
    formModel.value.safeQuestion,
    formModel.value.safeAnswer
  );
  if (response.code == 200) {
    ElMessage.success(response.msg);
    loginStore.isOpen = false;
  } else {
    ElMessage.warning(response.msg);
  }
};
const repasswordFormRef = ref();

async function checkUsername() {
  await repasswordFormRef.value.validate();
  const response = await userCheckService(formModel.value.username);
  console.log(response);
  if (response.code == 200) {
    formModel.value.safeQuestion = response.data.safeQuestion;
    isCheck.value = false;
    isReset.value = true;
  } else {
    ElMessage.warning(response.msg);
  }
}
const isCheck = ref(false);
const isReset = ref(false);
function navigateToCheck() {
  isLogin.value = false;
  isCheck.value = true;
}
function clearForm() {
  Object.keys(loginForm.value).forEach((key) => {
    loginForm.value[key] = "";
  });
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = "";
  });
  isLogin.value = true;
  isCheck.value = false;
  isReset.value = false;
}
const isModify = ref(false);
</script>

<!-- 模板 -->
<template>
  <el-dialog
    v-model="isOpen"
    width="30%"
    style="border-radius: 0.75rem"
    center
    @closed="clearForm"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="form"
      size="large"
      autocomplete="off"
      class="form"
      v-if="isModify"
    >
      <div class="head">
        <el-text size="large" tag="b" type="primary">设定自己的密码</el-text>
      </div>


      <!-- 第一次登录时修改密码的表单 -->
      <el-form-item>
        <el-input prop="safeQuestion"
          v-model="formModel.safeQuestion"
          :prefix-icon="Notebook"
          placeholder="请输入容易记忆的安全问题"
        ></el-input>
      </el-form-item>
      <el-form-item prop="safeAnswer">
        <el-input
          v-model="formModel.safeAnswer"
          :prefix-icon="ChatDotRound"
          placeholder="请输入容易记忆的安全问题的答案"
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
          确认设定
        </el-button>
      </el-form-item>
      <div class="navigate-to-register">
        <el-link type="primary"
          >重置密码时需要安全问题和答案</el-link
        >
      </div>
    </el-form>

    <el-form></el-form>
    <!--登录表单-->
    <el-form
      v-if="isLogin"
      class="form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      size="large"
      autocomplete="off"
    >
      <div class="head">
        <el-text size="large" tag="b" type="primary">登录</el-text>
      </div>

      <!--账号密码登录-->

      <el-form-item prop="username">
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

      <div class="dialog-footer" style="margin-bottom: 1rem">
        <el-button
          type="primary"
          size="large"
          @click="login"
          :style="{ width: '100%' }"
          >登录</el-button
        >
      </div>

      <div class="navigate-to-register">
        <el-link type="primary" @click="navigateToCheck">忘记密码？</el-link>
      </div>
    </el-form>

    <!-- 确认用户名表单 -->
    <el-form
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
      <!-- <div class="return">
        <el-link type="info" :underline="false" @click="navigateToLogin">
          返回
        </el-link>
      </div> -->
    </el-form>

    <!--重置密码表单-->
    <el-form
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
    </el-form>
  </el-dialog>
</template>

<style scoped>
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
