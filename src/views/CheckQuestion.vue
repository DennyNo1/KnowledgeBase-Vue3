<script setup>
import { userQuestionListService } from "@/api/question.js";
import { onMounted, ref,watch } from "vue";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/store/login";

const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();

const questionData = ref();
//符合条件的问题总数
const total = ref();

//这个是获取待审核和审核未通过的问题列表的函数
const getQuestionList = async (page, pageSize, queryName, isChecked, type) => {
  const response = await userQuestionListService(
    page,
    pageSize,
    queryName,
    type,
    isChecked
  );

  questionData.value = response.data.records;
  total.value = response.data.total;
};

//这个是获取某个权限下，未回复和已回复问题的问题列表函数
const getQuestionListManaged = async (
  page,
  pageSize,
  type,
  assignTo,
  isSolved
) => {
  const response = await userQuestionListService(
    page,
    pageSize,
    null,
    type,
    "1",
    isSolved,
    assignTo
  );
  questionData.value = response.data.records;
  total.value = response.data.total;
  if(route.query.isSolved==0) numOfWait.value=response.data.total;
  
};

onMounted(async () => {
  //进入默认选择待回复
  await getQuestionListManaged("1", "6", "默认", route.query.role, "0");
  
  


});

const handleItemClick = async (checkFlag) => {
  if (checkFlag == "waitForReply") {
    await router.push({
      path: `/question/check`,
      query: { role: loginStore.userInfo.role, isSolved: 0 },
    });
    await getQuestionListManaged("1", "6", "默认", route.query.role, "0");
    index.value = "waitForReply";
  }
  if (checkFlag == "alreadyReply") {
    await router.push({
      path: `/question/check`,
      query: { role: loginStore.userInfo.role, isSolved: 1 },
    });
    await getQuestionListManaged("1", "6", "默认", route.query.role, "1");
    index.value = "alreadyReply";
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
};

//点击单个问题
function handleClick(item) {
  //如果URL中有isChecked，那就push到审核的路由。否则就是普通的回答页面。
  if (route.query.isChecked) {
    router.push(`/question-page/check?id=${item.question.id}`);
  } else {
    router.push(`/question-page?id=${item.question.id}`);
  }
}
const index = ref("waitForReply");

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
    await getQuestionListManaged(
      currentPage,
      "6",
      "默认",
      route.query.role,
      route.query.isSolved
    );
  }
}
//给待回复数量
const numOfWait=ref("")

//监控store里的用户id

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
          <el-menu-item
            index="waitForReply"
            @click="handleItemClick('waitForReply')"
            v-if="loginStore.isLoggedIn && loginStore.userInfo.role != 'user'"
            >待回复
            <el-badge :value="numOfWait" ></el-badge>
              
            
          </el-menu-item>
          <el-menu-item
            index="alreadyReply"
            @click="handleItemClick('alreadyReply')"
            v-if="loginStore.isLoggedIn && loginStore.userInfo.role != 'user'"
            >已回复</el-menu-item
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
                  size="large"
                >
                  {{ item.question.isChecked == 0 ? "待审核" : "未通过" }}
                </el-tag>
              </el-text>
              <el-text v-else>
                <el-tag type="warning" round v-if="route.query.isSolved == 0">
                  待回复
                </el-tag>
                <el-tag type="success" round v-else> 已回复 </el-tag>
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
