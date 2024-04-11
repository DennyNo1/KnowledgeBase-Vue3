<script setup>
import { onMounted, ref } from "vue";

import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { userQuestionListService } from "@/api/question.js";
import { useLoginStore } from "@/store/login";
import { ElMessage } from "element-plus";

const getQuestionList = async (page, pageSize, queryName, isChecked,type) => {
  const response = await userQuestionListService(
    page,
    pageSize,
    queryName,
    isChecked,
    type,
  );
  console.log(response.data);
  questionData.value = response.data.records;
  total.value = response.data.total;
  
};
onMounted(() => {
  // if(route.query.type=='')
  // getQuestionList("1", "6", null, 1,null)
  // else{
  //   getQuestionList("1", "6", null, 1,route.query.type);
  // }
  getQuestionList("1", "6", route.query.queryName, 1,route.query.type)
});

const questionData = ref();
const total = ref();

const router = useRouter();
const route = useRoute();

let queryName = route.hash.substring(1);

function handleClick(item) {
  router.push(`/question-page?id=${item.question.id}`);
}

function handleCurrentChange(currentPage) {
  // 获取点击的页码
  console.log(currentPage);
  //获取当前页数
  if(route.query.type==''){
    getQuestionList(currentPage, "6", null, 1,null);
  }
  else {
    getQuestionList(currentPage, "6", null, 1,route.query.type);
  }
  
  
}

async function handleItemClick(type) {
  await router.push({
    path: `/question`,
    query: { type, queryName:route.query.queryName },
  });
  await getQuestionList(1, "6", route.query.queryName, 1,route.query.type);
}

const loginStore = useLoginStore();
//点击提出需求按钮的逻辑
function handleUpload(){
  if (loginStore.isLoggedIn) {
    router.push('/question/create')
  } else {
    ElMessage({
      message: "登录后才能新建需求",
      type: "warning",
    });
  }
}
</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          :default-active="route.query.type"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="默认" @click="handleItemClick('默认')"
            >默认</el-menu-item
          >
          <el-menu-item
            index="热门知识"
            @click="handleItemClick('热门知识')"
            >热门知识</el-menu-item
          >
          <el-menu-item
            index="营业"
            @click="handleItemClick('营业')"
            >营业</el-menu-item
          >
          <el-menu-item
            index="装维"
            @click="handleItemClick('装维')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="政企客户经理"
            @click="handleItemClick('政企客户经理')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item
            index="客经专员"
            @click="handleItemClick('客经专员')"
            >客经专员</el-menu-item
          >
          <el-menu-item
            index="支局长"
            @click="handleItemClick('支局长')"
            >支局长</el-menu-item
          >
          <el-menu-item
            index="片区长"
            @click="handleItemClick('片区长')"
            >片区长</el-menu-item
          >
          <el-menu-item
            index="VIP客户经理"
            @click="handleItemClick('VIP客户经理')"
            >VIP客户经理</el-menu-item
          >
        </el-menu>
      </el-card>
    </el-col>

    <el-button
      type="primary"
      size="large"
      class="upload-button"
      @click="handleUpload"
    >
      新建需求<el-icon><EditPen /></el-icon>
    </el-button>
    <el-col :span="2" />
  </el-row>

  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-page-header :icon="ArrowLeft" v-if="route.query.queryName" @click="router.push('/')">
        <template #content>
          <span class="text-large font-600 mr-3" > 搜索结果 </span>
        </template>
      </el-page-header>
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
              <!-- <el-text>
                <el-tag
                  :type="item.question.isSolved ? 'success' : 'danger'"
                  round
                >
                  {{ item.question.isSolved ? "已解决" : "未解决" }}
                </el-tag>
              </el-text> -->
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

.flex-grow {
  flex-grow: 1;
}
.el-text.hover-effect:hover {
  color: #409eff; /* 天蓝色 */
  cursor: pointer; /* 改变鼠标悬停时的样式为手型图标 */
}
.upload-button{
  position: absolute;
  right: 0px; /* 或者根据实际需求调整为合适的像素值 */
}
</style>
