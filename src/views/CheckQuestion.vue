<script setup>
import {
  userQuestionListService,
  userQuestionWithoutCommentListService,
} from "@/api/question.js";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/store/login";

const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();

const questionData = ref();
//符合条件的问题总数
const total = ref();

const getQuestionList = async (page, pageSize, queryName, isChecked, type) => {
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

//分配给某角色的问题
const getQuestionWithoutCommentList = async (
  page,
  pageSize,
  type,
  assignTo
) => {
  const response = await userQuestionWithoutCommentListService(
    page,
    pageSize,
    type,
    assignTo
  );
  questionData.value = response.data.records;
  total.value = response.data.total;
};

onMounted(() => {
  // 提供默认值
  // console.log('3')
  // if (route.query.isChecked) {
  //   getQuestionList("1", "6", null, route.query.isChecked, "默认");
  //   console.log('1')
  // } else {

  //因为专家和慧问都需要回复问题，所以第一个显示
  console.log("2");
  getQuestionWithoutCommentList("1", "6", "默认", route.query.role);
});

const handleItemClick = async (checkFlag) => {
  if (checkFlag == "solve") {
    await router.push({
      path: `/question/check`,
      query: { role: loginStore.userInfo.role, isSolved: 0 },
    });
    await getQuestionWithoutCommentList("1", "6", "默认", route.query.role);
    index.value = "comment";
  }
  if (checkFlag == 0 || checkFlag == -1) {
    await router.push({
      path: `/question/check`,
      query: { isChecked: checkFlag },
    });
    await getQuestionList(1, "6", null, checkFlag, "默认");
    if (checkFlag == 0) {
      index.value = "check";
    } else {
      index.value = "nopass";
    }
  }
  if(checkFlag=='publish'){
    await router.push({
      path: `/article`,
      
    });
  }
  
};

function handleClick(item) {
  //如果URL中有isChecked，那就push到审核的路由。否则就是普通的回答页面。
  if (route.query.isChecked) {
    router.push(`/question-page/check?id=${item.question.id}`);
  } else {
    router.push(`/question-page?id=${item.question.id}`);
  }
}
const index = ref("comment");

//切换页码
async function handleCurrentChange(currentPage) {
  //获取当前页数
  if (route.query.isChecked) {
    await getQuestionList(
      currentPage,
      "6",
      null,
      route.query.isChecked,
      "默认"
    );
  } else {
    await getQuestionWithoutCommentList(
      currentPage,
      "6",
      "默认",
      route.query.role
    );
  }
}
</script>

<template>
  <!-- 审核 -->
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          router
          :default-active="index"
        >
          <el-menu-item index="comment" @click="handleItemClick('solve')"
            >待回复</el-menu-item
          >
          <el-menu-item
            index="check"
            @click="handleItemClick(0)"
            v-if="loginStore.userInfo.role == 'admin'"
            >待审核</el-menu-item
          >
          <el-menu-item
            index="nopass"
            @click="handleItemClick(-1)"
            v-if="loginStore.userInfo.role == 'admin'"
            >审核未通过</el-menu-item
          >

        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="2" />
  </el-row>

  <!-- 待处理问题 -->
  <!-- <el-row v-if="route.query.role">
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          router
          default-active="1"
        >
          <el-menu-item index="1">待处理的需求</el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="2" />
  </el-row> -->

  <!-- 问题列表 -->
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
              <el-text v-if="route.query.isChecked">
                <el-tag
                  :type="item.question.isChecked == 0 ? 'warning' : 'info'"
                  round
                >
                  {{ item.question.isChecked == 0 ? "待审核" : "未通过" }}
                </el-tag>
              </el-text>
              <el-text v-else>
                <el-tag type="warning" round> 待回复 </el-tag>
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
      page-size="6"
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
