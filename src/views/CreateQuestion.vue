<script setup lang="ts">
import { ref } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { userQuestionAddService } from "@/api/question";
import { useLoginStore } from "@/store/login";
import { useRoute, useRouter } from "vue-router";

import type { Action } from "element-plus";

const router = useRouter();

const loginStore = useLoginStore();
const question = ref({
  title: "",
  description: "",
  type: "",
});
const formRef = ref();


const handleSubmit = async () => {
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能新建需求",
      type: "warning",
    });
    return;
  }
  await formRef.value.validate();
  // 在这里处理表单提交逻辑，例如发送到后端或者验证表单内容
  const res = await userQuestionAddService(
    loginStore.userInfo.id,
    question.value.title,
    question.value.description,
    question.value.type
  );

  // 清空表单
  question.value = {
    title: "",
    description: "",
    type: "",
  };
  ElMessageBox.alert("您新建的需求已成功，等待管理员审核", "提示", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "OK",
  });
  goBack();
};

//提出需求的表单的标题和描述不能为空的规则
const rules = {
  title: [{ required: true, message: "需求的标题不可为空", trigger: "blur" }],

  type: [{ required: true, message: "需求的类型不可为空", trigger: "blur" }],
};

function goBack() {
  router.back();
}
</script>
<template>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-form
        @submit.prevent="handleSubmit"
        label-width="80px"
        :model="question"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="type" label="岗位">
          <el-select v-model="question.type" placeholder="请选择需求的岗位">
            <el-option lable="营业" value="营业"></el-option>
            <el-option lable="装维" value="装维"></el-option>
            <el-option lable="政企客户经理" value="政企客户经理"></el-option>
            <el-option lable="客经专员" value="客经专员"></el-option>
            <el-option lable="支局长" value="支局长"></el-option>
            <el-option lable="片区长" value="片区长"></el-option>
            <el-option lable="VIP客户经理" value="VIP客户经理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="narrow-input"
          label="需求标题"
          size="large"
          prop="title"
        >
          <el-input
            v-model="question.title"
            placeholder="请输入需求标题"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 10 }"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>

        <!-- 这个产品精力太逆天了，竟然不需要问题描述 -->
        <el-form-item label="需求描述" size="large" prop="description">
          <el-input
            v-model="question.description"
            type="textarea"
            placeholder="请输入需求描述"
            :autosize="{ minRows: 10, maxRows: 50 }"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" size="large">提交</el-button>
          <el-button @click="goBack" size="large" 
            >返回</el-button
          >
        </el-form-item>
      </el-form></el-col
    >
  </el-row>
</template>
<style></style>
