<script setup>
import { onMounted, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/store/login";
import Avatar from "@/components/Avatar.vue";
import { login } from "@/api/knowledgeBase";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { QuestionWaitService } from "@/api/question";

const searchInput = ref("");
const select = ref("title");
const router = useRouter();
const loginStore = useLoginStore();

function submitSearch() {
  // 必须选择专栏的种类
  console.log(select.value);

  // if (select.value == "") {
  //   ElMessage({
  //     message: "选择专栏类别后才能进行搜索操作",
  //     type: "warning",
  //   });
  //   return;
  // }
  if (searchInput.value == "") {
    ElMessage({
      message: "请输入您要搜索的关键字",
      type: "warning",
    });
    return;
  }
  if(select.value=='title')
  {
    router.push(`/search?queryName=${searchInput.value}`);
    return
  }
  if(select.value=='uploader'){
    router.push(`/search?queryUploader=${searchInput.value}`);
    return
  }
  
}
const showLogin = () => {
  loginStore.isOpen = true;
};
const isAdmin = () => {
  if (loginStore.isLoggedIn) {
    if (loginStore.userInfo.role == "admin") {
      return true;
    }
  }
  return false;
};
const handleRoute = (v) => {
  selected.value = v;
  if(v=="myArticle"){
    router.push(`/myArticle?uploaderId=${loginStore.userInfo.id}`)
  }
  if (v =='question'||v=='article') {
    router.push(`/${v}?type=默认&page=1`);
  } else if (v == "check") {
    // router.push('/question/check?isChecked=0')
    router.push(`/question/check?role=${loginStore.userInfo.role}&isSolved=0`);
  }

  // else if(v=='solve'){
  //   router.push(`/question/check?role=${loginStore.userInfo.role}`);
  // }
};
const selected = ref("");
const wait = ref(false);
//监控store里的用户id
watch(
  () => loginStore.userInfo.role,
  async (newRole, oldRole) => {
    if (newRole !== oldRole) {
      // console.log("1");
      if (loginStore.isLoggedIn && loginStore.userInfo.role != "user") {
        const response = await QuestionWaitService(loginStore.userInfo.role);
        wait.value = response.data;
      }
    }
  },
  { immediate: true } // 设置immediate为true，表示在监听开始时立即执行一次
);
</script>

<template>
  <el-menu
    :default-active="selected"
    mode="horizontal"
    :ellipsis="false"
    router
    style="background-color: #2e6ebb"
  >
    <el-menu-item index="0" route="/">
      <img style="height: 100%" src="@/assets/logo.png" alt="Element logo" />
      <el-text type="primary" size="large" tag="b" style="color: white"
        >首页</el-text
      >
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
        placeholder="请输入想要搜索的关键字"
        class=""
        @keyup.enter="submitSearch"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="标题" style="width: 100px">
            <!-- <el-option label="视频" value="video" /> -->
            <el-option label="标题" value="title" />
            <el-option label="发布人" value="uploader" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="submitSearch" />
        </template>
      </el-input>
    </div>

    <!-- <el-menu-item index="video"  @click="handleRoute('video')">视频</el-menu-item> -->

    <el-menu-item
      index="article"
      @click="handleRoute('article')"
      style="color: white"
      >课件</el-menu-item
    >
    <el-menu-item
      index="question"
      @click="handleRoute('question')"
      style="color: white"
      >一线需求</el-menu-item
    >

    <el-menu-item
      index="check"
      @click="handleRoute('check')"
      v-if="loginStore.isLoggedIn && loginStore.userInfo.role != 'user'"
      style="color: white"
      >我的需求</el-menu-item
    >
    <el-badge class="item" :is-dot="wait"></el-badge>

    <el-menu-item
      index="myArticle"
      @click="handleRoute('myArticle')"
      v-if="loginStore.isLoggedIn && loginStore.userInfo.role != 'user'"
      style="color: white"
      >我的课件</el-menu-item
    >

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
