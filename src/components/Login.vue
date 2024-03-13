<script setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';//用于页面跳转
import { useLoginStore } from "@/store/login.js";
import { storeToRefs } from "pinia";
import { login as userLogin } from "@/api/knowledgeBase.js";
import { User, Lock } from '@element-plus/icons-vue'


const store = useLoginStore();
const isLogin=ref(true)
const { userInfo, isLoggedIn, isOpen, cookie } = storeToRefs(store);


    // // 获取router实例
    // const router = useRouter();
    
    // 获取login仓库实例
    const loginStore=useLoginStore()

    function navigateToRegister() {
      // 显示注册表单
      isLogin.value=false
    }




// const centerDialogVisible = ref(isOpen)
const form = ref({
  username: "",
  password: "",
  phone: "",
  validCode: "",
});

const type1 = ref("primary");
const type2 = ref("");
const usePassword = ref(true);

const formRef = ref();

const rules = reactive({
  username: [
    { required: true, message: "用户名不能为空！", trigger: "blur" },
    {
      min: 3,
      max: 11,
      message: "用户名的长度需为3-11个字符！",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6-20个字符", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
        if (regex.test(value)) {
          callback();
        } else {
          callback(
            new Error("密码必须包含至少一个大写字母、一个小写字母和一个数字")
          );
        }
      },
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "手机号不能为空！", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        const regex =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (regex.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      },
      trigger: "blur",
    },
  ],
  validCode: [{ required: true, message: "验证码不能为空！", trigger: "blur" }],
});

function enablePassword() {
  usePassword.value = true;
  type1.value = "primary";
  type2.value = "";
}

function enableMessage() {
  usePassword.value = false;
  type1.value = "";
  type2.value = "primary";
}

// function register(formRef) {
//   if (!formRef) return;
//   formRef.validate((valid) => {
//     if (valid) {
//       if (usePassword.value) {
//         // 使用账号密码注册
//       } else {
//         // 使用短信验证码注册
//       }
//     }
//   });
//   // isOpen.value = false;
// }

function login(formRef) {
  if (!formRef) return;
  formRef.validate((valid) => {
    if (valid) {
      if (usePassword.value) {
        // 使用账号密码登录
        userLogin(form.value.username, form.value.password).then((result) => {
          isLoggedIn.value = true;
          isOpen.value = false;
          userInfo.value.userId = result.data.id;
          userInfo.value.username = form.value.username;
          userInfo.value.nickname = result.data.nickName;
          userInfo.value.phone = result.data.phone;
          userInfo.value.role = result.data.role;
          userInfo.value.location = result.data.location;
          userInfo.value.department = result.data.department;
          cookie.value = result.data.cookie;
          console.log(store);
        });
      } else {
        // 使用短信验证码登录
      }
    }
  });
  // isOpen.value = false;
}
</script>





<template>
  <el-dialog v-model="isOpen" width="30%" style="border-radius: 0.75rem" center>

    <div v-if="isLogin" class="login">
      <div class="head">
        <!--这是空格-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-text size="large" tag="b" @click="enablePassword" :type="type1" justify="end"
          >账号密码登录</el-text
        >
        
        <!-- <el-text size="large" tag="b">|</el-text>
        &nbsp;&nbsp;&nbsp;
        <el-text size="large" tag="b" @click="enableMessage" :type="type2"
          >短信登录</el-text
        > -->
      </div>

    
  <!--账号密码登录-->
    <div v-if="usePassword" class="inp">
      <el-form ref="formRef" :rules="rules" status-icon :model="form">
        
        <el-item class="input-gap">
          <el-input :prefix-icon="User" v-model="form.username" placeholder="请输入用户名" ></el-input>
        </el-item>
        
        <el-item class="input-gap">
          <el-input :prefix-icon="Lock"v-model="form.password" show-password placeholder="请输入密码" ></el-input>
        </el-item>
        
      </el-form>
    </div>
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
        <el-button type="primary" size="large" @click="login(formRef)" :style="{ width: '100%' }">登录</el-button>
      </div>
      
      <div class="register">
      <el-link type="primary" @click="navigateToRegister" :underline="focusState" @focus="handleFocus" @blur="handleBlur" >没有账号？点击注册</el-link>
      </div>

    </div>


    <div v-else class="register">
      <el-form>
        <el-form-item>注册</el-form-item>
        <el-form-item>
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入市区"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>注册</el-button>
          <el-link @click="isLogin.value=ture">返回</el-link>
        </el-form-item>


      </el-form>
    </div>
    
   
      
    

    


  </el-dialog>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-left: 0%;
}

.el-text--large {
  font-size: 22px; /* 调整为适合的大小 */
}

.choose {
  margin-top: 20px;
  user-select: none;
}

.login {
  width: 80%;
  margin: auto;
}
.input-gap {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: center;
}

.head {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: center;
}
.register{
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: right;;
}
.dialog-footer{
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: center;
}






</style>
