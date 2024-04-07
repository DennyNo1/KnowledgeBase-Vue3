<script setup>
import { onMounted, ref } from "vue";
import { ChatLineRound, Chicken, View } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { userArticleListService } from "@/api/article.js";
import { useLoginStore } from "@/store/login";
import { watch } from 'vue'


const router = useRouter();
const total = ref();
const loginStore = useLoginStore();
const articleData = ref({});
const route = useRoute();
async function getArticleList(page, pageSize, queryName, type) {
  try {
    const response = await userArticleListService(
      page,
      pageSize,
      queryName,
      type
    );
    // console.log(response.data)
    articleData.value = response.data.records;
    total.value = response.data.total;
    console.log(articleData.value);
  } catch (error) {
    console.log("请求失败！", error);
  }
}
onMounted(() => {
  getArticleList("1", "6", route.query.queryName, route.query.type);
});

function handleClick(item) {
  // console.log('点击了卡片')
  // console.log(item)
  router.push(`/article-page?id=${item.article.id}`);
}

//切换页码
async function handleCurrentChange(currentPage) {
  // 获取点击的页码
  console.log(currentPage);
  //获取当前页数

    await getArticleList(currentPage, "6", route.query.queryName, route.query.type);
  
}

async function handleItemClick(type) {
  // if(type=='')
  // await getArticleList("1", "6", null, null)
  // else{
  //   await getArticleList("1", "6", null, type);
  // }
  // console.log(route.query.type)
  // await getArticleList("1", "6", null, type.value);
  // const type = '营业'; // 或根据实际需求动态获取

  // console.log(type)
  await router.push({
    path: `/article`,
    query: { type, queryName:route.query.queryName },
  });
  await getArticleList(1, "6", route.query.queryName, route.query.type);
}

function handleUpload() {
  if (loginStore.isLoggedIn) {
    router.push("/article/create");
  } else {
    ElMessage({
      message: "登录后才能采编课件",
      type: "warning",
    });
  }
}

//监控store里的用户id
watch(
  () => route.query.queryName, 
  async (newId, oldId) => {
    if (newId !== oldId) {
      await getArticleList(1, "6", route.query.queryName, route.query.type);
    }
  },
  { immediate: true } // 设置immediate为true，表示在监听开始时立即执行一次
);
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
          <el-menu-item index="热门知识" @click="handleItemClick('热门知识')"
            >热门知识</el-menu-item
          >
          <el-menu-item index="营业" @click="handleItemClick('营业')"
            >营业</el-menu-item
          >
          <el-menu-item index="装维" @click="handleItemClick('装维')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="政企客户经理"
            @click="handleItemClick('政企客户经理')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item index="客经专员" @click="handleItemClick('客经专员')"
            >客经专员</el-menu-item
          >
          <el-menu-item index="支局长" @click="handleItemClick('支局长')"
            >支局长</el-menu-item
          >
          <el-menu-item index="片区长" @click="handleItemClick('片区长')"
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
      采编课件<el-icon><ZoomIn /></el-icon>
    </el-button>
  </el-row>

  <el-row>
    <el-col :span="2" />

    <el-col :span="20">
      <el-page-header :icon="ArrowLeft" v-if="route.query.queryName" @click="router.push('/')">
        <template #content>
          <span class="text-large font-600 mr-3" > 搜索结果 </span>
        </template>
      </el-page-header>
      <el-row class="cards" v-for="item in articleData">
        <el-card class="box-card" shadow="hover" @click="handleClick(item)">
          <el-row>
            <el-text size="large" tag="b" line-clamp="1">
              {{ item.article.title }}
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
                  dayjs(item.article.date).format("YYYY-MM-DD")
                }}</time></el-text
              >
            </el-col>
            <el-col :span="6">
              <!--              <div class="flex-grid" />-->
              <!-- 谁在乎评论数？ -->
              <!-- <el-text>
                <el-button text :icon="ChatLineRound">
                  {{ item.article.commentCount }}
                </el-button>
                
              </el-text> -->
              <el-text>
                <el-button text :icon="View">
                  {{ item.article.clickCount }}
                </el-button>
                <!--                <View style="width: 1rem; height: 1em; margin-right: 4px" /> {{ item.commentVolume }}-->
              </el-text>

              <el-text>
                <el-button text
                  ><el-icon><Star /></el-icon>
                  {{ item.article.likeCount }}
                </el-button>
                <!--                <View style="width: 1rem; height: 1em; margin-right: 4px" /> {{ item.commentVolume }}-->
              </el-text>
            </el-col>

            <el-col :span="4">
              <!--              <div class="flex-grid" />-->
              <!-- 谁在乎评论数？ -->
              <!-- <el-text>
                <el-button text :icon="ChatLineRound">
                  {{ item.article.commentCount }}
                </el-button>
                
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
      :page-size="6"
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
.upload-button {
  position: absolute;
  right: 0px; /* 或者根据实际需求调整为合适的像素值 */
}
</style>
