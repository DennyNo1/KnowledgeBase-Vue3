<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  articleSearchListService,
  articleSearchUploaderService,
} from "@/api/article.js";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import {
  questionSearchTitleService,
  questionSearchUploaderService,
} from "@/api/question";
import { watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useLoginStore } from "@/store/login";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

const route = useRoute();
const articleData = ref([]);
//总页数
const total = ref();

//这个是显示的页码
const currentPage = ref(1);

const router = useRouter();

//代表这个内容的类别是什么，课件还是一线需求
const content = ref("article");

const questionData = ref();

//为了获取查询标题的article
async function getArticleSearchList(page, pageSize, queryName) {
  try {
    const response = await articleSearchListService(page, pageSize, queryName);
    articleData.value = response.data.records;
    total.value = response.data.total;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

//获取查询发布者的article
async function getArticleSearchQueryUploader(page, pageSize, queryUploader) {
  try {
    const response = await articleSearchUploaderService(
      page,
      pageSize,
      queryUploader
    );
    articleData.value = response.data.records;
    total.value = response.data.total;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

async function getQuestionSearchTitle(page, pageSize, queryName) {
  try {
    const response = await questionSearchTitleService(
      page,
      pageSize,
      queryName
    );

    questionData.value = response.data.records;
    total.value = response.data.total;
    // console.log(articleData.value[0].user);
  } catch (error) {
    console.log("请求失败！", error);
  }
}

async function getQuestionSearchUploader(page, pageSize, queryUploader) {
  try {
    const response = await questionSearchTitleService(
      page,
      pageSize,
      queryUploader
    );

    questionData.value = response.data.records;
    total.value = response.data.total;
    // console.log(articleData.value[0].user);
  } catch (error) {
    console.log("请求失败！", error);
  }
}

onMounted(async () => {
  if (route.query.queryName) {
    getArticleSearchList("1", "6", route.query.queryName);
  }
  if (route.query.queryUploader) {
    getArticleSearchQueryUploader("1", "6", route.query.queryUploader);
  }
});

//页码切换
async function handleCurrentChange(truePage) {
  // 获取点击的页码
  if (content.value == "article") {
    if (route.query.queryName) {
      getArticleSearchList(truePage, "6", route.query.queryName);
    }
    if (route.query.queryUploader) {
      console.log(truePage);
      getArticleSearchQueryUploader(truePage, "6", route.query.queryUploader);
    }
  }

  //显示值等于真实值
  currentPage.value = truePage;

  if (content.value == "question") {
    if (route.query.queryName) {
      getQuestionSearchTitle(truePage, "6", route.query.queryName);
    }
    if (route.query.queryUploader) {
      getQuestionSearchUploader(truePage, "6", route.query.queryUploader);
    }
  }
}
//切换内容类型
async function handleItemChange(item) {
  if (item == "article") {
    content.value = "article";
    if (route.query.queryName) {
      getArticleSearchList("1", "6", route.query.queryName);
    }
    if (route.query.queryUploader) {
      getArticleSearchQueryUploader("1", "6", route.query.queryUploader);
    }
  }
  if (item == "question") {
    content.value = "question";
    if (route.query.queryName) {
      getQuestionSearchTitle("1", "6", route.query.queryName);
    }
    if (route.query.queryUploader) {
      getQuestionSearchUploader("1", "6", route.query.queryUploader);
    }
  }
  currentPage.value = 1;
}

onBeforeRouteUpdate((to, from) => {
  // if (to.query.queryName !== from.query.queryName) {
  //   // 更新组件状态，如重新加载数据
  //   getArticleSearchList("1", "6", to.query.queryName);
  // }
  // if (to.query.queryUploader !== from.query.queryUploader) {
  //   getArticleSearchUploaderService("1", "6", to.query.queryUploader);
  // }

  // console.log(to.query);
  // console.log(from.query);
  // console.log(to.query.queryUploade);
  // console.log(from.query.queryUploader);

  if (to.query.queryName) {
    console.log("queryName");
    getArticleSearchList("1", "6", to.query.queryName);
  }

  if (to.query.queryUploader) {
    console.log("queryUploader");
    getArticleSearchQueryUploader("1", "6", to.query.queryUploader);
  }

  content.value = "article";
  currentPage.value = 1;
});

function setHoverColor(color, index) {
  // hoverColor.value = color;
  articleData.value[index].hoverColor = color;
}

//点击进入article详情页
function handleClick(item) {
  router.push(`/article-page?id=${item.article.id}`);
}

async function handleEdit(articleId) {
  await router.push({
    path: `/article/create`,
    query: { articleId: articleId },
  });
}
const loginStore = useLoginStore();
</script>
<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu mode="horizontal" :default-active="content">
          <el-menu-item index="article" @click="handleItemChange('article')">
            课件
          </el-menu-item>
          <el-menu-item index="question" @click="handleItemChange('question')">
            一线需求
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
  </el-row>

  <el-row style="margin-top: 15px">
    <el-col :span="2" />
    <el-col :span="20">
      <!-- 搜索标题头 -->
      <el-page-header :icon="ArrowLeft" @click="router.push('/')">
        <template #content>
          <b> 搜索结果 </b>
        </template>
      </el-page-header>

      <!-- article的搜索结果列表 -->

      <el-row
        class="cards"
        v-for="(item, index) in articleData"
        v-if="content == 'article'"
      >
        <el-card class="box-card" shadow="hover">
          <el-row>
            <el-col :span="22">
              <el-text
                size="large"
                tag="b"
                line-clamp="1"
                @click="handleClick(item)"
                :style="{
                  cursor: 'pointer',
                  color: articleData[index].hoverColor,
                }"
                :key="index"
                @mouseover="setHoverColor('#409eff', index)"
                @mouseout="setHoverColor('#646467', index)"
              >
                {{ item.article.title }}
                <!-- {{ articlearticleData[index]}} -->
              </el-text>
            </el-col>

            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="handleEdit(item.article.id)"
              v-if="
                loginStore.userInfo.role == 'admin' ||
                item.article.uploaderId == loginStore.userInfo.id
              "
            />
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
            <el-col :span="4">
              <el-text>类型： {{ item.article.type }}</el-text>
            </el-col>
            <el-col :span="2"> </el-col>
          </el-row>

          <!-- <p></p>
          
          <el-row
            v-if="
              loginStore.userInfo.role == 'admin' &&
              item.article.uploaderId == loginStore.userInfo.id
            "
          >
            <el-button type="primary" @click="handleEdit">编辑</el-button>
          </el-row> -->
        </el-card>
      </el-row>

      <el-row
        class="cards"
        v-for="item in questionData"
        v-if="content == 'question'"
      >
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
                  :type="item.question.isSolved ? 'success' : 'warning'"
                  round
                >
                  {{ item.question.isSolved ? "已回复" : "待回复" }}
                </el-tag>
              </el-text>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <!-- 页数栏 -->
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
          :current-page="currentPage"
          :page-size="6"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-col>
  </el-row>
</template>
<style scoped>
.box-card {
  width: 100%;
  border-radius: 0.5rem;
}
.cards {
  margin-top: 15px;
}
</style>
