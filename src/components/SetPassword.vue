<script setup>
import { useLoginStore } from "@/store/login.js";
import { ref, reactive } from "vue";
import { userResetService } from "@/api/user";
import { encryptData, decryptData } from "@/utils/encrypt.js";
import { ElMessage } from "element-plus";
//注册表单的对象、变量、函数
const formRef = ref();
// 整个的用于提交的form数据对象
const formModel = ref({
  password: "",
  repassword: "",
  safeQuestion: "",
  safeAnswer: "",
});

function handleClose() {}
const dialogVisible = ref(false);
function cancel() {
  useLoginStore().isSet = true;
  dialogVisible.value = false;
}
function comfirm() {
  dialogVisible.value = false;
  location.reload();
}

const rules = {
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
  safeQuestion: [
    { required: true, message: "请输入安全问题", trigger: "blur" },
  ],
  safeAnswer: [
    { required: true, message: "请输入安全问题答案", trigger: "blur" },
  ],
};
async function setPassword() {
  await formRef.value.validate();
  const reponse = await userResetService(
    useLoginStore().userInfo.username,
    encryptData(formModel.value.password),
    formModel.value.safeQuestion,
    formModel.value.safeAnswer
  );
  if (reponse.code == 200) {
    ElMessage.success("设定新密码成功，请您重新登录");
    setTimeout(() => {
      // 这里放置您希望在一秒钟后执行的代码
      console.log("这是在消息显示一秒钟后执行的操作");
    }, 2000); // 延迟时间，1000 毫秒即1秒
    location.reload();
  }
}
</script>
<template>
  <el-dialog
    v-model="useLoginStore().isSet"
    width="30%"
    style="border-radius: 0.75rem"
    center
    @closed="dialogVisible = true"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      size="large"
      autocomplete="off"
      class="form"
    >
      <div class="head">
        <el-text size="large" tag="b" type="primary">设定自己的密码</el-text>
      </div>
      <el-form-item prop="safeQuestion">
        <el-input
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
          @click="setPassword"
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
        <el-link type="primary">重置密码时需要安全问题和答案</el-link>
      </div>
    </el-form>
    <!-- 第一次登录时修改密码的表单 -->
  </el-dialog>

  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="500"
    :before-close="handleClose"
  >
    <span
      >如果您不设定自己的密码，只能以游客身份浏览。您确定退出设定密码？</span
    >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel()" type="primary">取消</el-button>
        <el-button type="danger" @click="comfirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
.form {
  width: 80%;
  margin: auto;
}
.navigate-to-register {
  margin-top: 20px; /* 调整间距 */
  display: flex;
  justify-content: right;
}
.head {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
