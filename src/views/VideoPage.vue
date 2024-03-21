<script setup>
import { onMounted, ref, reactive } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import Comment from "@/components/Comment.vue";
import { useLoginStore } from "@/store/login.js";
import { oneVideo } from "@/api/knowledgeBase.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { userOneVideoService } from "@/api/video";

const loginStore = useLoginStore();

//视频的数据.如果后端传过来的数据本身是对象，一定要加{}
const videoData = ref({});
//视频上传者的数据
const uploaderData = ref({});
const videoId=ref()
const route = useRoute();

async function getOneVideo() {
  // 使用 useRoute 获取当前路由实例
  
  // 从路由查询参数中获取 id
  
  videoId.value = route.query.id;
  console.log(videoId.value);//类型是Number

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
const belongType=ref('video')

</script>

<template>
  <el-row class="page-header">
    <el-col :span="4" />
    <el-col :span="16">
      <div class="header-content">
        <el-button type="text" @click="goBack">返回</el-button>
        <h2 class="title">{{ videoData.title }}</h2>
        
          <div class="meta-info">
            <span>上传者：{{ uploaderData.nickName }}</span>
          </div>
          <div class="meta-info">
            <span>上传时间：{{ videoData.date }}</span>
          </div>
        
      </div>
    </el-col>
    <el-col :span="4" />
  </el-row>
  <el-row>
    <el-col :span="4" />
    <el-col :span="16">
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
    <el-col :span="4" />
    <el-col :span="16">
      <h3>评论</h3>
      <Comment  :belongType="belongType" />
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 10px;
}
.meta-info {
  font-size: 0.9em;
  color: #848484;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}
</style>

