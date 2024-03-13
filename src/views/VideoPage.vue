<script setup>
import { onMounted, ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import Comment from "@/components/Comment.vue";
import { useLoginStore } from "@/stores/login.js";
import { oneVideo } from "@/api/knowledgeBase.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const video = ref({
  video: {
    id: 1,
    type: "营业",
    uploaderId: 1,
    date: "2024-01-17T09:40:09",
    clickCount: "6",
    title: "中国电信视频",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  nickName: "张昊天",
  department: "云中台",
});

const router = useRouter();
const route = useRoute();
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

const commentData = ref([]);

// onMounted(() => {
//   getVideo()
// })

const commentSrc = ref("https://");

function goBack() {
  router.back();
}

const id = route.query.id || 1;

async function getVideo() {
  try {
    const response = await oneVideo(id, userInfo.value.userId);
    console.log(response.data[0]);
    video.value = response.data[0];
    commentData.value = response.data[1];
  } catch (error) {
    console.log("请求失败！", error);
  }
}
</script>

<template>
  <el-row>
    <el-col :span="4" />
    <el-col :span="16">
      <el-page-header
        :icon="ArrowLeft"
        title="返回"
        style="margin-bottom: 20px"
        @back="goBack"
      >
        <template #content>
          <!--          <span style="font-size: 24px; font-weight: bold">-->
          <!--            {{ video.title }}-->
          <!--          </span>-->
          <h2>{{ video.video.title }}</h2>
        </template>
      </el-page-header>
    </el-col>
    <el-col :span="4" />
  </el-row>
  <el-row>
    <el-col :span="4" />
    <el-col :span="16">
      <video controls v-if="video.video" style="width: 100%" preload="auto">
        <source :src="video.video.url" type="video/mp4" />
        <p>
          Your browser doesn't support HTML5 video. Here is a
          <a href="{{ video.video.url }}">link to the video</a> instead.
          抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以使用下面的链接
          <a href="{{ video.video.url }}">下载</a>
          并用观看
        </p>
      </video>
    </el-col>
    <el-col :span="4" />
  </el-row>
  <el-row>
    <el-col :span="4" />
    <el-col :span="16">
      <h3>评论</h3>
      <Comment :comment-src="commentSrc" />
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<style scoped>
h3 {
  margin-top: 40px;
}
</style>
@/store/login.js
