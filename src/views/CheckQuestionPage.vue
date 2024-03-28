<script setup>
import { handleError, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import {userCheckService} from "@/api/question.js";
import { userOneQuestionService } from "@/api/question.js";
const router = useRouter();
const route = useRoute();
const id = route.query.id;
const question = ref({});
const user=ref({})
const getQuestion = async () => {
  try {
    const response = await userOneQuestionService(id);
    question.value = response.data.question;
    user.value = response.data.user;
    console.log(question);
  } catch (error) {
    console.log("请求失败！", error);
  }
};

onMounted(() => {
  getQuestion();
 
});




function goBack() {
  // console.log(videoData.value.url)
  router.back();
}
const handleCheck=(isChecked)=>{
    const questionId=router.currentRoute.value.query.id;
    console.log(isChecked)
    userCheckService(questionId,isChecked)
    goBack()
}

</script>



<template>
  
  <el-row class="page-header">
    <el-col :span="4" />
    
    <el-col :span="16">
      <div class="header-content">
        <el-button
         
          @click="goBack"
          size="large"
          style="font-size: 18px"
          >返回</el-button
        >
        <h2 class="title">{{ question.title }}</h2>

        <div class="meta-info">
          <span>上传者：{{ user.username }}</span>

          <span>部门：{{ user.department }}</span>

          <span>上传时间：{{ question.date }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="问题描述">
        <!-- <el-descriptions-item label="用户昵称">{{
          question.username
        }}</el-descriptions-item>
        <el-descriptions-item label="创建日期">{{
          dayjs(question.date).format("YYYY-MM-DD")
        }}</el-descriptions-item>
        <el-descriptions-item label="部门">{{
          question.place
        }}</el-descriptions-item> -->
      </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-text class="article"   size="large"> {{ question.content }}</el-text>
      <el-divider style="margin-top: 30px" />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <!-- 审核按钮 -->
  <el-row v-if="question.isChecked==0">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-button type="success" size="large" class="check-pass" @click="handleCheck(1)">审核通过</el-button>
      <el-button type="info" size="large"  @click="handleCheck(-1)">审核不予通过</el-button>
      </el-col>
    </el-row>
    
  
</template>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 10px;
}
.meta-info {
  font-size: 0.9em;
  color: #848484;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.meta-info span:not(:last-child) {
  margin-right: 10px; /* 调整此处的数值以适应您的需求 */
}
.check-pass{
    margin-right: 20px;
}
</style>
