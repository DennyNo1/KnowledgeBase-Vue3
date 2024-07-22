<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";

const searchInput = ref("");
const select = ref("title");
const router = useRouter();

function submitSearch() {
  console.log(select.value);
  // 搜索内容不得为空
  if (searchInput.value == "") {
    ElMessage({
      message: "请输入您要搜索的关键字",
      type: "warning",
    });
    return;
  }
  if (select.value == "title") {
    router.push(`/search?queryName=${searchInput.value}`);
    return;
  }
  if (select.value == "uploader") {
    router.push(`/search?queryUploader=${searchInput.value}`);
    return;
  }
}
</script>

<template>
  <el-row class="container">
    <el-row class="sub-container">
      <el-text style="color: white"
        >欢迎使用中国电信舟山触点人员综合支撑平台</el-text
      >
    </el-row>

    <el-row style="margin-top: 0rem; display: flex">
      <el-input
        v-model="searchInput"
        placeholder="请输入想要搜索的关键字"
        class="input-with-select"
        size="large"
        @keyup.enter="submitSearch"
      >
        <template #prepend>
          <el-select
            v-model="select"
            placeholder="标题"
            style="width: 115px"
            size="large"
          >
            <!-- <el-option label="视频" value="video" /> -->
            <el-option label="标题" value="title" />
            <el-option label="发布人" value="uploader" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="submitSearch" />
        </template>
      </el-input>
    </el-row>
  </el-row>

  <el-row style="margin-top: 0rem">
    <el-text
      style="
        font-size: 1.5rem;
        color: #2e6ebb;
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        margin-top: 2rem;
      "
      >网站使用指南：1、支持标题/上传者的关键字搜索；2、课件浏览请点击右上角“课件”；3、支撑需求提交请从右上角“一线需求”入口进入。</el-text
    >
  </el-row>

  <el-row style="margin-top: 10rem; display: flex">
    <el-col :span="20"></el-col>
    <el-col :span="4">
      <div class="button-container">
        <button class="custom-button" @click="router.push('/CDChat')">触点助手</button>
        <button class="custom-button" @click="router.push('/BPChat')">标品助手</button>
      </div></el-col
    >
  </el-row>
</template>

<style scoped>
.el-text {
  font-size: 60px;
}

.container {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.sub-container {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #2e6ebb; /* Blue background */
}

.input-with-select {
  width: 50vw;
  border-radius: 1rem;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 增加按钮间的间距 */
}

.custom-button {
  background-color: #007BFF; /* 按钮背景色 */
  color: white; /* 文字颜色 */
  border: none; /* 移除边框 */
  padding: 10px 20px; /* 内边距 */
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px; /* 圆角 */
  transition: all 0.3s ease; /* 过渡动画 */
}

.custom-button:hover {
  background-color: #2e6ebb; /* 鼠标悬停时的背景色 */
}
</style>
