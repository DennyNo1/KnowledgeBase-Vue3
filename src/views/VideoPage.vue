<script setup>
import { onMounted, ref,reactive } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import Comment from "@/components/Comment.vue";
import { useLoginStore } from "@/store/login.js";
import { oneVideo } from "@/api/knowledgeBase.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { userOneVideoService } from "@/api/video";
const loginStore=useLoginStore()

//视频的数据.如果后端传过来的数据本身是对象，一定要加{}
const videoData = ref({})
//视频上传者的数据
const uploaderData=ref({})


  async function getOneVideo ()  {
  // 使用 useRoute 获取当前路由实例
  const route = useRoute();
  // 从路由查询参数中获取 id
  const videoId = route.query.id;
  console.log(videoId)

  try{
    const response=await userOneVideoService(videoId,null)

    console.log(response)
    videoData.value=response.data.video
    uploaderData.value=response.data.user
    
    
    console.log(videoData.value.title)
  }catch(error)
  {
    console.log("请求失败！", error);
  }
  
};

onMounted(() => {
  getOneVideo()
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

const commentData = ref([]);

// onMounted(() => {
//   getVideo()
// })

const commentSrc = ref("https://");

function goBack() {
  router.back();
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
          
          <h2>{{ videoData.title }}</h2>
        </template>
      </el-page-header>
    </el-col>
    <el-col :span="4" />
  </el-row>
  <el-row>
    <el-col :span="4" />
    <el-col :span="16">

      <video controls  style="width: 100%" preload="auto">
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
