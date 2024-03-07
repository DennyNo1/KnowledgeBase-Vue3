<script setup>
import Menu from "@/components/Menu.vue";
import { RouterView } from "vue-router";
import Aside from "@/components/Aside.vue";
import Footer from "@/components/Footer.vue";
import Login from "@/views/Login.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Menu />
      </el-header>
      <el-container>
        <el-aside width="25vw">
          <Aside />
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <Login />
  </div>
  <!--  <el-backtop :right="100" :bottom="100" />-->
</template>

<style scoped>
.common-layout {
  height: 100%;
}
.el-aside {
  max-width: 300px;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
/* .el-header {
  background-color: #aaa;
}
.el-aside {
  background-color: #999;
} */

/* .el-main {
  background-color: #555;
}
.el-footer {
  background-color: #333;
}*/

.el-main {
  overflow: auto; /* 如果内容过多，添加滚动条 */
}
</style>
