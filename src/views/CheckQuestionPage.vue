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
  
  <el-row style="margin-bottom: 1rem;">
    <el-col :span="4" />

    <el-col :span="16">

      <h2 style="font-size: 2rem;margin-bottom: 0%">{{ question.title }}</h2>
      <br />
      <el-descriptions title="问题信息" column="5">
        <el-descriptions-item>
          <el-icon><View /></el-icon>&nbsp&nbsp{{ question.clickCount }}
        </el-descriptions-item>
        <el-descriptions-item label="发布人">
          {{ user.nickName }}
        </el-descriptions-item>
        <el-descriptions-item label="部门">
          {{ user.department }}
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag> {{ question.type }} </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="发布时间">
          <!-- {{ dayjs(videoData.date).format("YYYY-MM-DD") }} -->
          {{ question.date }}
        </el-descriptions-item>
      </el-descriptions>


    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row style="margin-bottom: 0%;">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="问题描述"> </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row >
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-text class="article" size="large"> {{ question.content }}</el-text>
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
