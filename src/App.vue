<script setup>
import { RouterView } from "vue-router";
import { useLoginStore } from "@/store/login.js";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";

// 实现pinia中数据的本地存储和读取
const store = useLoginStore();
const { userInfo, isLoggedIn, isOpen, cookie } = storeToRefs(store);

// 在页面加载时自动从本地存储读取数据
onMounted(() => {
  const savedUserInfo = localStorage.getItem("userInfo");
  const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
  const savedIsOpen = localStorage.getItem("isOpen");
  const savedCookie = localStorage.getItem("cookie");
  if (savedUserInfo) {
    userInfo.value = JSON.parse(savedUserInfo);
  }

  if (savedIsLoggedIn) {
    isLoggedIn.value = JSON.parse(savedIsLoggedIn);
  }

  if (savedIsOpen) {
    isOpen.value = JSON.parse(savedIsOpen);
  }

  if (savedCookie) {
    cookie.value = savedCookie;
  }
  console.log("userInfo", userInfo);
});

watch(cookie, () => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn.value));
  localStorage.setItem("isOpen", JSON.stringify(isOpen.value));
  localStorage.setItem("cookie", cookie.value);
});
</script>

<template>
  <router-view />
  <!--  <header>-->
  <!--    <div class="wrapper">-->
  <!--      <HelloWorld msg="You did it!" />-->

  <!--      <nav>-->
  <!--        <RouterLink to="/">Home</RouterLink>-->
  <!--        <RouterLink to="/about">About</RouterLink>-->
  <!--      </nav>-->
  <!--    </div>-->
  <!--  </header>-->

  <!--  <RouterView />-->
</template>

<style scoped></style>
@/store/login.js
