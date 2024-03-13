<script setup>
import { onMounted, ref } from "vue";
import { someQuestions } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";

const articleData = ref([
  {
    question: {
      id: 8,
      questionerId: 1,
      date: "2024-01-24T09:55:00",
      title:
        "测试问题11111111111111111111111111111111111111111111111111111111111111111111111111111111",
      content: null,
      imageUrls: null,
      videoUrls: null,
    },
    nickName: "张昊天",
  },
  {
    question: {
      id: 11,
      questionerId: 1,
      date: "2024-01-24T09:55:04",
      title: "测试问题2",
      content: null,
      imageUrls: null,
      videoUrls: null,
    },
    nickName: "张昊天",
  },
  {
    question: {
      id: 21,
      questionerId: 2,
      date: "2024-01-24T09:55:06",
      title: "测试问题3",
      content: null,
      imageUrls: null,
      videoUrls: null,
    },
    nickName: "李松泽",
  },
]);

const router = useRouter();
const route = useRoute();

let page = 1;
let queryName = route.hash.substring(1);
let pageSize = 12;
const totalPage = ref(1);

async function getQuestions() {
  try {
    const response = await someQuestions(page, pageSize, queryName);
    // console.log(response.data);
    articleData.value = response.data["records"];
    totalPage.value = response.data.total;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

// onMounted(() => {
//   getQuestions()
// })

function handleClick(item) {
  router.push(`/question-page?id=${item.question.id}`);
}

function handleCurrentChange(currentPage) {
  // 获取点击的页码
  console.log(currentPage);
  page = currentPage;
  getQuestions();
}

function handleItemClick(index) {
  if (index !== queryName) {
    queryName = index;
    getQuestions();
  }
}
</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          :default-active="`question${route.hash}`"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="question" @click="handleItemClick('')"
            >默认</el-menu-item
          >
          <el-menu-item
            index="question#commend"
            @click="handleItemClick('commend')"
            >热门知识</el-menu-item
          >
          <el-menu-item
            index="question#business"
            @click="handleItemClick('business')"
            >营业</el-menu-item
          >
          <el-menu-item
            index="question#operation"
            @click="handleItemClick('operation')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="question#manager"
            @click="handleItemClick('manager')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item
            index="question#commissioner"
            @click="handleItemClick('commissioner')"
            >客经专员</el-menu-item
          >
          <el-menu-item
            index="question#director"
            @click="handleItemClick('director')"
            >支局长</el-menu-item
          >
          <el-menu-item
            index="question#distinct"
            @click="handleItemClick('distinct')"
            >片区长</el-menu-item
          >
          <el-menu-item
            index="question#manager"
            @click="handleItemClick('vipManager')"
            >VIP客户经理</el-menu-item
          >
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="2" />
  </el-row>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-row class="cards" v-for="item in articleData">
        <el-card class="box-card" shadow="hover" @click="handleClick(item)">
          <el-row>
            <el-text size="large" tag="b" line-clamp="1">
              {{ item.question.title }}
            </el-text>
          </el-row>
          <el-row style="margin-top: 10px; align-items: center">
            <el-col :span="6">
              <el-text>发布人： {{ item.question.questionerId }}</el-text>
            </el-col>
            <el-col :span="6">
              <el-text>部门： {{ item.department }}</el-text>
            </el-col>
            <el-col :span="9">
              <el-text
                >发布时间：
                <time>{{
                  dayjs(item.question.date).format("YYYY-MM-DD")
                }}</time></el-text
              >
            </el-col>
            <el-col :span="3">
              <!--              <div class="flex-grid" />-->
              <el-text>
                <el-tag
                  :type="item.question.solved ? 'success' : 'danger'"
                  round
                >
                  {{ item.question.solved ? "已解决" : "未解决" }}
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
      :page-count="totalPage"
      @current-change="handleCurrentChange"
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

.flex-grow {
  flex-grow: 1;
}
</style>
