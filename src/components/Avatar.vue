<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
} from "@element-plus/icons-vue";
import avatar from '@/assets/default.png'
import { useLoginStore } from "@/store/login.js";
const loginStore=useLoginStore()
</script>
<template>
  <el-dropdown placement="bottom-end" >
    <!-- 展示给用户，默认看到的 -->
    <span class="el-dropdown__box" style="display: flex; align-items: center;">
      <el-avatar :src="avatar" size="small" style="margin-right: 10px;"></el-avatar>
      <el-text style="display: inline-block;">{{loginStore.userInfo.nickName}}</el-text>
    </span>

    <!-- 折叠的下拉部分 -->
    <template #dropdown>
      <el-dropdown-menu class="custom-dropdown-menu">
        <el-dropdown-item 
          class="custom-dropdown-item"
          >市区公司 {{loginStore.userInfo.location}}</el-dropdown-item
        >
        <el-dropdown-item 
          class="custom-dropdown-item"
          >部门 {{loginStore.userInfo.department}}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.custom-dropdown-menu {
  background-color: #f0f2f5; /* 自定义背景颜色 */
  border-radius: 4px; /* 自定义边框圆角 */
}

.custom-dropdown-item {
  padding: 8px 20px; /* 自定义内边距 */
  font-size: 14px; /* 自定义字体大小 */
  color: #333; /* 自定义字体颜色 */
  &:hover {
    background-color: #e4e8f1; /* 鼠标悬停时的背景颜色 */
  }
}
</style>
