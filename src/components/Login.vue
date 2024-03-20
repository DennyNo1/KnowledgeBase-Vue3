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
} from "@element-plus/icons-vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { userRegisterService,userLoginrService } from "@/api/user";
import { ElMessage } from "element-plus";

const loginStore = useLoginStore();
const isLogin = ref(true);
const { userInfo, isLoggedIn, isOpen, cookie } = storeToRefs(loginStore);

// // 获取router实例
// const router = useRouter();

// 获取login仓库实例

// 登录表单切换到注册表单
function navigateToRegister() {
  isLogin.value = false;
}

function navigateToLogin() {
  //先打开登录页面
  isLogin.value = true;
  //清空注册表单
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

const type1 = ref("primary");
const type2 = ref("");
const usePassword = ref(true);

// 登录表单的对象
const loginFormRef = ref();

const loginRules = reactive({
  username: [
    { required: true, message: "用户名不能为空！", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是 5-10位 的字符", trigger: "blur" },
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

function enablePassword() {
  usePassword.value = true;
  type1.value = "primary";
  type2.value = "";
}

//登录按钮
const login = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await loginFormRef.value.validate();
  const res=await userLoginrService(loginForm.value);
  //登录失败
  if(res.code!=200)
  {
    ElMessage.error(res.msg)
  }
  //登录成功
  else {
    ElMessage.success(res.msg)
    //关闭窗口。数据应该不用清楚吧。
    loginStore.isOpen=false
    //存用户信息到pinia
    loginStore.userInfo=res.data
    loginStore.isLoggedIn=true
    console.log( loginStore.userInfo)
    
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
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是 5-10位 的字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是 6-15位 的非空字符",
      trigger: "blur",
    },
  ],
  repassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
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
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        const regex =
          /^((13[0-9])|(14[5,7])|(15[^4])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if (regex.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      },
      trigger: "blur",
    },
  ],
  location: [{ required: true, message: "请选择市区公司", trigger: "blur" }],
  department: [{ required: true, message: "请输入部门", trigger: "blur" }],
};

const register = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await form.value.validate();
  await userRegisterService(formModel.value);
  ElMessage.success("注册成功");
  loginStore.isOpen = false;
  navigateToLogin;
};
</script>

<!-- 模板 -->
<template>
  <el-dialog
    v-model="isOpen"
    width="30%"
    style="border-radius: 0.75rem"
    center
    @close="navigateToLogin"
  >
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
          <el-text size="large" tag="b" @click="enablePassword" :type="type1"
            >账号密码登录</el-text
          >
        </div>
      
      <!--账号密码登录-->
     
        
          <el-form-item  prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item  prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        
      
      <!--手机号登录-->
      <!-- <div v-else class="login">
      <el-form ref="formRef" :rules="rules" status-icon :model="form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="验证码" prop="validCode">
          <el-input v-model="form.validCode" />
        </el-form-item>
      </el-form>
    </div> -->

      <!--登录表单底部-->

      <div class="dialog-footer">
        <el-button
          type="primary"
          size="large"
          @click="login"
          :style="{ width: '100%' }"
          >登录</el-button
        >
      </div>

      <div class="navigate-to-register">
        <el-link
          type="primary"
          @click="navigateToRegister"
          :underline="focusState"
          @focus="handleFocus"
          @blur="handleBlur"
          >没有账号？点击注册</el-link
        >
      </div>
    </el-form>

    <!--注册表单-->
    <el-form
      :model="formModel"
      :rules="rules"
      ref="form"
      size="large"
      autocomplete="off"
      v-else
      class="form"
    >
      <div class="head">
        <el-text size="large" tag="b" :type="type1">新用户注册</el-text>
      </div>
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
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          v-model="formModel.repassword"
          :prefix-icon="Lock"
          type="password"
          placeholder="请输入再次密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input
          v-model="formModel.nickName"
          :prefix-icon="UserFilled"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="formModel.phone"
          :prefix-icon="Iphone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="location">
        <el-select v-model="formModel.location" placeholder="请选择市区公司">
          <el-option lable="市公司" value="市公司"></el-option>
          <el-option lable="定海区" value="定海区"></el-option
          ><el-option lable="普陀区" value="普陀区"></el-option
          ><el-option lable="岱山县" value="岱山县"></el-option>
          <el-option lable="嵊泗县" value="嵊泗县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="department">
        <el-input
          v-model="formModel.department"
          :prefix-icon="OfficeBuilding"
          placeholder="请输入部门"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="register"
          class="button"
          type="primary"
          auto-insert-space
          :style="{ width: '100%' }"
        >
          注册
        </el-button>
      </el-form-item>
      <div class="return">
        <el-link type="info" :underline="false" @click="navigateToLogin">
          返回
        </el-link>
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
