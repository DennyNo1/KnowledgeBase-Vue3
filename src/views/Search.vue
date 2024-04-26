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
const select = ref("article");
const router = useRouter();

function submitSearch() {
  // 默认搜索视频页面
  if (select.value == "") {
    ElMessage({
      message: "选择专栏类别后才能进行搜索操作",
      type: "warning",
    });
    return;
  }
  if (searchInput.value == "") {
    ElMessage({
      message: "请输入您的搜索内容",
      type: "warning",
    });
    return;
  }
  router.push(`/${select.value}?type=默认&queryName=${searchInput.value}`);
}
</script>

<template>
  <el-row class="container">
    <el-row class="sub-container">
      <el-text>欢迎使用中国电信知识库</el-text>
    </el-row>
    
    <el-row style="margin-top: 0rem; display: flex">
      <el-input
        v-model="searchInput"
        placeholder="请输入想要搜索的内容"
        class="input-with-select"
        size="large"
        @keyup.enter="submitSearch"
      >
        <template #prepend>
          <el-select
            v-model="select"
            placeholder="课件"
            style="width: 115px; height: auto"
            size="large"
          >
            <!-- <el-option label="视频" value="video" /> -->
            <el-option label="课件" value="article" />
            <el-option label="一线需求" value="question" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="submitSearch" />
        </template>
      </el-input>
    </el-row>
  </el-row>
  <el-row>
    <el-text
      style="
        font-size: small;
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
      "
      >网站使用指南:1、支持关键字搜索。默认搜索课件，点击更改为需求;2、课件浏览请点击右上角“课件”;3、支撑需求提交请从右上角“一线需求”入口进入。</el-text
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
  
}

.input-with-select {
  width: 50vw;
  border-radius: 1rem;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
