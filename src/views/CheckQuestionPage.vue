<script setup>
import { handleError, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { userCheckService } from "@/api/question.js";
import { userOneQuestionService } from "@/api/question.js";
const router = useRouter();
const route = useRoute();
const id = route.query.id;
const question = ref({});
const user = ref({});
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
const stringQuestionId = router.currentRoute.value.query.id;
  const questionId = parseInt(stringQuestionId, 10);
const handleCheck = (isChecked, assignTo) => {


  userCheckService(questionId, isChecked, assignTo);
  if (assignTo != "admin") {
    goBack();
  } else {
    router.push(`/question-page?id=${questionId}`);
  }
};
const assign = ref();
const assignInChinese = ref();

const handleCommand = (command) => {
  assign.value = command;
  switch (command) {
    case "business":
      assignInChinese.value = "营业专家";
      break;
    case "maintain":
      assignInChinese.value = "装维专家";
      break;
    case "govermentManager":
      assignInChinese.value = "政企客户经理";
      break;
    case "customerManager":
      assignInChinese.value = "客户经理专家";
      break;
    case "director":
      assignInChinese.value = "支局长专家";
      break;
    case "areaManager":
      assignInChinese.value = "片区张专家";
      break;
    case "VIPManager":
      assignInChinese.value = "VIP客户经理专家";
      break;
  }

  dialogVisible.value = true;
};
const dialogVisible = ref(false);
const handleConfirm=async ()=>{
  
  await userCheckService(questionId, 1, assign.value);
  goBack()
}
</script>

<template>
  <el-row style="margin-bottom: 1rem">
    <el-col :span="4" />

    <el-col :span="16">
      <h2 style="font-size: 2rem; margin-bottom: 0%">{{ question.title }}</h2>
      <br />
      <el-descriptions title="需求信息" column="5">
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

  <el-row style="margin-bottom: 0%">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="需求描述"> </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-text class="article" size="large"> {{ question.content }}</el-text>
      <el-divider style="margin-top: 30px" />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <!-- 审核按钮 -->
  <el-row v-if="question.isChecked == 0">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-dropdown class="check-pass" @command="handleCommand">
        <el-button type="success" size="large">
          审核通过并派单<el-icon><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="business">营业专家</el-dropdown-item>
            <el-dropdown-item command="maintain">装维专家</el-dropdown-item>
            <el-dropdown-item command="govermentManager"
              >政企客户经理专家</el-dropdown-item
            >
            <el-dropdown-item command="customerManager"
              >客户经理专家</el-dropdown-item
            >
            <el-dropdown-item command="director">支局长专家</el-dropdown-item>
            <el-dropdown-item command="areaManager"
              >片区长专家</el-dropdown-item
            >
            <el-dropdown-item command="VIPManager"
              >VIP客户经理专家</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button
        type="primary"
        size="large"
        class="check-pass"
        @click="handleCheck(1, 'admin')"
        >审核通过并由慧问工作室回复</el-button
      >

      <el-button type="info" size="large" @click="handleCheck(-1, null)"
        >审核不予通过</el-button
      >
    </el-col>
  </el-row>

  <el-dialog v-model="dialogVisible" title="提示" width="500">
    <span>您确定派单给{{ assignInChinese }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleConfirm" type="primary">确定</el-button>
        <el-button @click="dialogVisible = false"> 返回 </el-button>
      </div>
    </template>
  </el-dialog>
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
.check-pass {
  margin-right: 20px;
}
</style>
