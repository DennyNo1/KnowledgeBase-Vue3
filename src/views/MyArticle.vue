<script setup>
import { userArticleListService } from "@/api/article.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/store/login";
import dayjs from "dayjs";
import { Edit } from "@element-plus/icons-vue";
const loginStore = useLoginStore();
const articleData = ref([]);
const total = ref();
const route = useRoute();
const router=useRouter()
async function getArticleList(page,uploaderId) {
  try {
    const response = await userArticleListService(page, 6, null, null, uploaderId);
    articleData.value = response.data.records;
    total.value = response.data.total;
  } catch (error) {
    console.log("请求失败！", error);
  }
}
onMounted(() => {
  getArticleList(1,route.query.uploaderId);
});

//（）的参数是组件传递给这个事件的真实的页数
async function handleCurrentChange(truePage) {

  //获取当前页数

  await getArticleList(
    truePage,
    route.query.uploaderId
  );
  currentPage.value=truePage
}


async function handleEdit(articleId){
  await router.push({
      path: `/article/create`,
      query: { articleId: articleId },
    });

}

function handleClick(item) {
  // console.log('点击了卡片')
  // console.log(item)
  router.push(`/article-page?id=${item.article.id}`);
}
</script>
<template>
  <el-row>
    <el-col :span="2" />

    <el-col :span="20">

      <el-row class="cards" v-for="(item, index) in articleData">
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
                <!-- {{ articleData[index]}} -->
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
            <el-col :span="4">
              <el-text>发布人： {{ item.user.nickName }}</el-text>
            </el-col>
            <el-col :span="4">
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
            <el-col :span="3">
              <el-tag type="primary" round>
                置顶度：{{ item.article.top }}
              </el-tag>
            </el-col>
            <el-col :span="3">
              <el-text
                ><el-icon><View /></el-icon>
                {{ item.article.clickCount }}</el-text
              ></el-col
            >
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
    </el-col>
    <el-col :span="2" />
  </el-row>

  <!-- 底部页码栏 -->
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
