<script setup>
import { userQuestionListService } from "@/api/question.js";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const questionData = ref();
//符合条件的问题总数
const total = ref();


const getQuestionList = async (page, pageSize, queryName, isChecked,type) => {
  const response = await userQuestionListService(
    page,
    pageSize,
    queryName,
    isChecked,
    type
  );
  console.log(response.data);
  questionData.value = response.data.records;
  total.value = response.data.total;
};

onMounted(() => {
   // 提供默认值
  getQuestionList("1", "6", null, route.query.isChecked,'默认');
});

const handleItemClick = async (checkFlag) => {
  await router.push({
    path: `/question/check`,
    query: {isChecked:checkFlag },
  });
  await getQuestionList(1, "6", null, checkFlag,'默认');
  
};

function handleClick(item) {
  router.push(`/question-page/check?id=${item.question.id}`);
}
</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          router
          :default-active="route.query.isChecked"
         
        >
          <el-menu-item index="0" @click="handleItemClick(0)"
            >待审核</el-menu-item
          >
          <el-menu-item index="-1" @click="handleItemClick(-1)">审核未通过</el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="2" />
  </el-row>

  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-row class="cards" v-for="item in questionData">
        <el-card class="box-card" shadow="hover" @click="handleClick(item)">
          <el-row>
            <el-text size="large" tag="b" line-clamp="1" class="hover-effect">
              {{ item.question.title }}
            </el-text>
          </el-row>
          <el-row style="margin-top: 10px; align-items: center">
            <el-col :span="6">
              <el-text>发布人： {{ item.user.nickName }}</el-text>
            </el-col>
            <el-col :span="6">
              <el-text>部门： {{ item.user.department }}</el-text>
            </el-col>
            <el-col :span="6">
              <el-text
                >发布时间：
                <time>{{
                  dayjs(item.question.date).format("YYYY-MM-DD")
                }}</time></el-text
              >
            </el-col>
            <el-col :span="4">
              <el-text>类型： {{ item.question.type }}</el-text>
            </el-col>
            <el-col :span="2">
              <!--              <div class="flex-grid" />-->
              <el-text>
                <el-tag
                  :type="item.question.isChecked == 0 ? 'warning' : 'info'"
                  round
                >
                  {{ item.question.isChecked == 0 ? "待审核" : "未通过" }}
                </el-tag>
              </el-text>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="2" />
  </el-row>

  <el-row
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
    "
  >
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :page-size="6"
    />
  </el-row>
</template>
<style scoped>
.cards {
  margin-top: 15px;
}

.box-card {
  width: 100%;
  border-radius: 0.5rem;
}
.top {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 20px;
}
</style>
