<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/store/login";
import Avatar from "@/components/Avatar.vue";
import { login } from "@/api/knowledgeBase";

const searchInput = ref("");
const select = ref("");
const router = useRouter();
const loginStore = useLoginStore();

function submitSearch() {
  // 默认搜索视频页面
  router.push(`/${select.value || "video"}?search=${searchInput.value}`);
}
const showLogin = () => {
  loginStore.isOpen = true;
};
const isAdmin=()=>{
  if(loginStore.isLoggedIn)
 {
  if(loginStore.userInfo.role=='admin')
  {
    return true
  }
  
 }
 return false

}
</script>

<template>
  <el-menu default-active="true" mode="horizontal" :ellipsis="false" router>
    <el-menu-item index="0" route="/">
      <img style="height: 100%" src="@/assets/logo.png" alt="Element logo" />
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
            <el-option label="课件" value="article" />
            <el-option label="一线需求" value="question" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="submitSearch" />
        </template>
      </el-input>
    </div>

    <el-menu-item index="1" route="/video">视频</el-menu-item>

    <el-menu-item index="2" route="/article">课件</el-menu-item>
    <el-menu-item index="3" route="/question?type=">一线需求</el-menu-item>
    <el-menu-item  index="4" route="/question/check?isChecked=0" >一线需求审核</el-menu-item> 
    <!-- v-if="loginStore.isLoggedIn && loginStore.userInfo.role=='admin'" -->

    <el-menu-item v-if="loginStore.isLoggedIn">
      <Avatar></Avatar>
    </el-menu-item>
    <el-menu-item v-else>
      <el-button @click="showLogin" type="primary">登录</el-button>
    </el-menu-item>

    <!-- <router-link to="/login" class="menu-login-item">
      <el-menu-item index="4">
    <el-button type="primary">登录</el-button>
  </el-menu-item>
</router-link> -->

    <!-- <el-menu-item index="-1"  class="menu-login-item" @click="handleLogin">
      <el-button type="primary" >登录</el-button>
    </el-menu-item>-->
  </el-menu>
</template>

<!-- <script>
export default {
  methods: {
    handleLogin() {
      this.$router.push('/login');
    },
  },
};
</script> -->

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
