<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const searchInput = ref("");
const select = ref("");
const router = useRouter();

function submitSearch() {
  // 默认搜索视频页面
  router.push(`/${select.value || "video"}?search=${searchInput.value}`);
}
</script>

<template>
  <el-row class="container">
    <el-row class="sub-container">
      <el-text>欢迎使用中国电信知识库</el-text>
    </el-row>
    <el-row class="sub-container">
      <el-input
        v-model="searchInput"
        placeholder="请输入想要搜索的内容"
        class="input-with-select"
        size="large"
        @keyup.enter="submitSearch"
      >
        <template #prepend>
          <el-button :icon="Search" @click="submitSearch" />
        </template>
        <template #append>
          <el-select
            v-model="select"
            placeholder="选择专栏"
            style="width: 115px"
          >
            <el-option label="视频" value="video" />
            <el-option label="课件" value="article" />
            <el-option label="一线需求" value="question" />
          </el-select>
        </template>
      </el-input>
    </el-row>
  </el-row>
</template>

<style scoped>
.el-text {
  font-size: 60px;
}

.container {
  width: 100%;
  height: 80%;
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
  height: 50px;
  width: 50vw;
  border-radius: 1rem;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
