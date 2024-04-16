<script setup>
import { onMounted, ref, reactive } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import Comment from "@/components/Comment.vue";
import { useLoginStore } from "@/store/login.js";
import { oneVideo } from "@/api/knowledgeBase.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { userOneVideoService } from "@/api/video";
import dayjs from "dayjs";
import { ChatLineRound, Chicken, View } from "@element-plus/icons-vue";
const loginStore = useLoginStore();

//视频的数据.如果后端传过来的数据本身是对象，一定要加{}
const videoData = ref({});
//视频上传者的数据
const uploaderData = ref({});
const videoId = ref();
const route = useRoute();

async function getOneVideo() {
  // 使用 useRoute 获取当前路由实例

  // 从路由查询参数中获取 id

  videoId.value = route.query.id;
  console.log(videoId.value); //类型是Number

  try {
    const response = await userOneVideoService(videoId.value, null);

    // console.log(response);
    videoData.value = response.data.video;
    uploaderData.value = response.data.user;
    // console.log(videoData.value.url);
  } catch (error) {
    console.log("请求失败！", error);
  }
}

onMounted(() => {
  getOneVideo();
});

const router = useRouter();

const store = useLoginStore();
const { userInfo } = storeToRefs(store);

// const commentData = ref([
//   {
//     user: '用户1',
//     avatar: '',
//     content: '',
//     commend: 0,
//     isLiked: false,
//     repl: [
//       {
//         user: '',
//         avatar: '',
//         content: '',
//         commend: 0,
//         isLiked: false,
//       }
//     ]
//   }
// ])

function goBack() {
  // console.log(videoData.value.url)
  router.back();
}

//作为父组件，传给子组件comment.vue的变量。videoId在上面已经定义了
const belongType = ref("video");
</script>

<template>
  <!-- <el-row class="page-header">
    <el-col :span="4" />
    <el-col :span="16">
      <div class="header-content">
        <span >
          <el-button class="back" @click="goBack" style="font-size: 18px"
            >返回</el-button>
          <h1 class="title" >{{ videoData.title }}</h1>
        </span>

        <div class="meta-info">
          <span>上传者：{{ uploaderData.nickName }}</span>

          <span>部门：{{ uploaderData.department }}</span>

          <span>上传时间：{{ videoData.date }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="4" />
  </el-row> -->

  <el-row style="margin-bottom: 2rem;">
    <el-col :span="5" />
    <el-col :span="14">
      <!-- <el-page-header :icon="ArrowLeft" @back="goBack">
        
        <template #content>
          
          
        </template>
      </el-page-header> -->
      <h2 style="font-size: 2rem;margin-bottom: 0rem;">{{ videoData.title }}</h2>
      <br />
      <el-descriptions title="视频信息" column="5" style="margin-bottom: 0%;">
        <el-descriptions-item>
          <el-icon><View /></el-icon>&nbsp&nbsp{{ videoData.clickCount }}
        </el-descriptions-item>
        <el-descriptions-item label="发布人">
          {{ uploaderData.nickName }}
        </el-descriptions-item>
        <el-descriptions-item label="部门">
          {{ uploaderData.department }}
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag> {{ videoData.type }} </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="发布时间">
          <!-- {{ dayjs(videoData.date).format("YYYY-MM-DD") }} -->
          {{ videoData.date }}
        </el-descriptions-item>


        <!-- <el-descriptions-item label="知识标签">
          <el-tag
            v-for="t in article.tag"
            :key="t.label"
            effect="plain"
            :type="t.type"
            :round="true"
            style="margin-right: 0.5rem"
            >{{ t.label }}</el-tag
          >
        </el-descriptions-item> -->
      </el-descriptions>
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row style="margin-top: 1rem; margin-bottom: 10px">
    <el-col :span="5" />
    <el-col :span="14">
      <!-- 添加 v-if="videoData.url" 是为了避免在视频数据加载完成之前尝试访问 videoData.url -->
      <video v-if="videoData.url" controls style="width: 100%" preload="auto">
        <source :src="videoData.url" type="video/mp4" />
        <p>
          Your browser doesn't support HTML5 video. Here is a
          <a href="{{ videoData.url }}">link to the video</a> instead.
          抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以使用下面的链接
          <a href="{{ videoData.url }}">下载</a>
          并用观看
        </p>
      </video>
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row>
    <el-col :span="5" />
    <el-col :span="14">
      <h3>评论</h3>
      <Comment :belongType="belongType" />
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<style scoped>
.title {
  margin-bottom: 10px;
  font-size: 2rem;
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
</style>
