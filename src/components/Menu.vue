<script setup>
import { ref } from 'vue'
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const searchInput = ref('')
const select = ref('')
const router = useRouter()

function submitSearch() {
  // 默认搜索视频页面
  router.push(`/${select.value || 'video'}?search=${searchInput.value}`)
}

</script>

<template>
  <el-menu
      default-active="true"
      mode="horizontal"
      :ellipsis="false"
      router
  >
    <el-menu-item index="0" route="/">
      <img
          style="height: 100%"
          src="@/assets/logo.png"
          alt="Element logo"
      />
      <el-text type="primary" size="large" tag="b">知识库</el-text>
    </el-menu-item>
    <div class="flex-grow" />
<!--    <el-input-->
<!--        v-model="input"-->
<!--        class="w-50 m-2"-->
<!--        placeholder="Type something"-->
<!--        :prefix-icon="Search"-->
<!--    />-->
    <div class="search">
      <el-input
          v-model="searchInput"
          placeholder="请输入想要搜索的内容"
          class=""
          @keyup.enter="submitSearch"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 85px">
            <el-option label="视频" value="video" />
            <el-option label="案例" value="passage" />
            <el-option label="问答" value="question" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="submitSearch" />
        </template>
      </el-input>
    </div>

    <el-menu-item index="1" route="/video">视频</el-menu-item>
    <el-sub-menu index="2" route="/ppt">
      <template #title>案例&课件</template>
      <el-menu-item index="2-1" route="/passage">案例</el-menu-item>
      <el-menu-item index="2-2" route="/question">知识问答</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.search {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 2rem;
}

.flex-grow {
  flex-grow: 1;
}
</style>