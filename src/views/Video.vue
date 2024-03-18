<script setup>
import { onMounted, ref } from "vue";
import { someVideos } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { userVideoListService } from "@/api/video";

const videos = ref(); //默认的视频列表数据

const router = useRouter();
const route = useRoute();

let page = 1;
let queryName = route.hash.substring(1);
let pageSize = 12;
const totalPage = ref(1);

onMounted(() => {
  getVideos("1", "12", null, null);
});

function handleClick(v) {
  // console.log(v);
  router.push(`/video-page?id=${v.video.id}`);
}

function handleCurrentChange(currentPage) {
  // 获取点击的页码
  console.log(currentPage);
  page = currentPage;
  getVideos();
}

// 获取默认视频列表
async function getVideos(page, pageSize, queryName, type) {
  try {
    console.log("t");
    const response = await userVideoListService(
      page,
      pageSize,
      queryName,
      type
    );
    console.log(response.data);
    videos.value = response.data["records"];
    totalPage.value = response.data.total;
    console.log(totalPage.value);
  } catch (error) {
    console.log("请求失败！", error);
  }
}

function handleItemClick(index) {
  if (index !== queryName) {
    queryName = index;
    getVideos();
  }
}

// const currentPage = ref(route.query.page === null ? 1 : parseInt(route.query.page))
// console.log(route.query.page);
// console.log(currentPage.value);
// console.log(route.query.page ? route.query.page.toNumber() : 1);

// console.log(route.query.id); // 123
// console.log(route.query.name); // John Doe
// console.log(currentPage.value);
</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="22">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          :default-active="`video${route.hash}`"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="video" @click="handleItemClick('')"
            >默认</el-menu-item
          >
          <el-menu-item
            index="video#commend"
            @click="handleItemClick('commend')"
            >热门知识</el-menu-item
          >
          <el-menu-item
            index="video#business"
            @click="handleItemClick('business')"
            >营业</el-menu-item
          >
          <el-menu-item
            index="video#operation"
            @click="handleItemClick('operation')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="video#manager"
            @click="handleItemClick('manager')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item
            index="video#commissioner"
            @click="handleItemClick('commissioner')"
            >客经专员</el-menu-item
          >
          <el-menu-item
            index="video#director"
            @click="handleItemClick('director')"
            >支局长</el-menu-item
          >
          <el-menu-item
            index="video#distinct"
            @click="handleItemClick('distinct')"
            >片区长</el-menu-item
          >
          <el-menu-item
            index="video#distinct"
            @click="handleItemClick('vipManger')"
            >VIP客户经理</el-menu-item
          >
          <!-- el-col在这里就可以理解成空格 -->
          <el-col :span="8" />
      <el-menu-item><el-button type="primary" size="large">
            上传视频<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button></el-menu-item>
          
        </el-menu>
      </el-card>
    </el-col>

    <el-col :span="2"> </el-col>
  </el-row>
  <el-row>
    <el-col :span="2" />
    <el-space :size="20" wrap class="space">
      <el-card
        v-for="v in videos"
        :body-style="{ padding: '0px' }"
        shadow="hover"
        class="video-card"
        @click="handleClick(v)"
      >
        <!-- 获取单个视频 -->
        <!--        封面视频-->
        <video controls style="width: 100%" preload="metadata">
          <source :src="v.video.url" type="video/mp4" class="" />
          <p>
            Your browser doesn't support HTML5 video. Here is a
            <a href="{{ v.video.url }}">link to the video</a> instead.
            抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以使用下面的链接
            <a href="{{ v.video.url }}">下载</a>
            并用观看
          </p>
        </video>
        <div style="padding: 14px">
          <el-text size="large" tag="b" line-clamp="2">
            {{ v.video.title }}
          </el-text>
          <el-row style="margin-top: 10px">
            <el-col :span="12"
              ><el-text>发布人：{{ v.nickName }}</el-text></el-col
            >
            <el-col :span="12"
              ><el-text>部门：{{ v.department }}</el-text></el-col
            >
          </el-row>
          <el-row style="margin-top: 8px">
            <div class="flex-grow" />
            <time class="description">{{
              dayjs(v.video.date).format("YYYY-MM-DD HH:mm:ss")
            }}</time>
          </el-row>
        </div>
      </el-card>
    </el-space>
  </el-row>
  <el-row
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
    "
  >
    <!-- 分页控件 -->
    <el-pagination
      layout="prev, pager, next"
      :page-size="12"
      :total="totalPage"
      @current-change="handleCurrentChange"
      background
    />
  </el-row>
</template>

<style scoped>
.space {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -20px;
}

.video-card {
  width: 300px;
  border-radius: 0.5rem;
}

.description {
  font-size: 12px;
  color: #999;
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
