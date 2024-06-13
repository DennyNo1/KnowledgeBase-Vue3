<script setup>
import { ArrowLeft, CaretTop } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import Comment from "@/components/Comment.vue";

import { useLoginStore } from "@/store/login.js";
import { storeToRefs } from "pinia";
import { oneArticle } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";
import {
  userOneArticleService,
  userArticleLikeService,
} from "@/api/article.js";
import { userLikeService } from "@/api/comment.js";
import { ElMessage } from "element-plus";

import { watch } from "vue";
const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();
const id = route.query.id;
const article = ref({});
const attachmentList = ref([]);
const user = ref({});
//登录的用户是否已经点过赞
const like = ref();

const getArticle = async () => {
  try {
    const response = await userOneArticleService(id, loginStore.userInfo.id);
    console.log(response);
    article.value = response.data.articleListDTO.article;
    user.value = response.data.articleListDTO.user;
    // console.log(response.data.attachmentList);
    attachmentList.value = response.data.attachmentList;
    like.value = response.data.liked;
    console.log(like.value);

    // console.log(attachementList.value);
  } catch (error) {
    console.log("请求失败！", error);
  }
};
function goBack() {
  router.back();
}

onMounted(() => {
  getArticle();
});

// 如果登录状态变化，就重新获取文章区
watch(
  () => loginStore.userInfo.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      //重新获取文章区
      const response = await userArticleLikeService(id, loginStore.userInfo.id);
      like.value = response;
    }
  },
  { immediate: true } // 设置immediate为true，表示在监听开始时立即执行一次
);

// const article = ref({
//   id: 1,
//   type: "装维",
//   uploaderId: 2,
//   date: "2024-01-17T09:42:28",
//   author: "张三",
//   department: "智能云",
//   sort: "案例",
//   tag: [
//     { type: "", label: "投诉案例" },
//     { type: "success", label: "核心网" },
//     { type: "info", label: "投诉分享" },
//     { type: "danger", label: "核心网投诉" },
//     { type: "warning", label: "案例分享" },
//   ],
//   content:
//     "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。".split(
//       "\r\n\r\n"
//     ),
//   clickCount: "0",
//   title: "中国电信联合发布国家级人工智能大模型服务",
// });

const commentSrc = ref("");
const commentData = ref([]);
const belongType = ref("article");

const store = useLoginStore();
const { userInfo } = storeToRefs(store);
async function toggleLike() {
  //先判断是否登录
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能进行该操作",
      type: "warning",
    });
    return;
  }
  if (!like.value) {
    await userLikeService(loginStore.userInfo.id, "article", route.query.id);
    await getArticle();
  } else {
    ElMessage({
      message: "您已点赞过该课件",
      type: "primary",
    });
    return;
  }
}
const downloadFile = async (attachment) => {
  try {
    const response = await fetch(attachment.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 创建一个 Blob 对象
    const blob = await response.blob();

    // 创建一个对象URL
    const url = URL.createObjectURL(blob);

    // 创建一个隐藏的可下载链接
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', attachment.name); // 或者使用你想要的文件名

    // 添加到 DOM
    document.body.appendChild(link);

    // 模拟点击
    link.click();

    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
  }
};
</script>

<template>
  <el-row style="margin-bottom: 1rem">
    <el-col :span="4" />
    <el-col :span="16">
      <!-- <el-page-header :icon="ArrowLeft" @back="goBack">
        
        <template #content>
          
          <h2 class="article-title-center"style="text-align: center;">{{ article.title }}</h2>
        </template>
      </el-page-header> -->

      <h2 style="font-size: 2rem; margin-bottom: 0%">{{ article.title }}</h2>
      <br />
      <el-descriptions title="文章信息" :column="6">
        <el-descriptions-item>
          <el-icon><View /></el-icon>&nbsp&nbsp{{ article.clickCount }}
        </el-descriptions-item>
        <el-descriptions-item label="发布人">
          {{ user.nickName }}
        </el-descriptions-item>
        <el-descriptions-item label="市区公司">
          {{ user.location }}
        </el-descriptions-item>
        <el-descriptions-item label="部门">
          {{ user.department }}
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag size="small"> {{ article.type }} </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布时间">
          <!-- {{ dayjs(article.date).format("YYYY-MM-DD") }} -->
          {{ article.date }}
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

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="正文内容"> </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <!-- 正文 -->
  <el-row>
    <el-col :span="4" />
    <el-col :span="16">
      <div class="article" v-html="article.content"></div>
      <el-divider style="margin-top: 30px" />
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row style="margin-top: 30px; margin-bottom: 10px">
    <el-col :span="14" />
    <!-- 附件栏 -->
    <div v-if="attachmentList.length > 0">
      附件列表
      <div class="attachment" v-for="attachment in attachmentList">
        <span class="attachment-name"></span>
        <el-icon><Document /></el-icon>
        <a
          class="download-link"
          @click.prevent="downloadFile(attachment)"
          >{{ attachment.name }}</a
        >
      </div>
    </div>
  </el-row>
  <el-row style="margin-top: 30px; margin-bottom: 10px">
    <el-col :span="4" />
    <el-button
      type="primary"
      :icon="CaretTop"
      size="large"
      :plain="!like"
      @click="toggleLike()"
      >点赞&nbsp;{{ article.likeCount }}
    </el-button></el-row
  >

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <h3>评论</h3>
      <Comment :belongType="belongType" />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<style scoped>
/*
.text-large {
  font-weight: bold;
  font-size: 24px;
}
*/

.article {
  display: block; /* 将 el-text 设置为块级元素 */
  margin-bottom: 10px; /* 添加下外边距，增加各段落之间的间距 */
  text-indent: 2em; /* 添加文本缩进，每段开头空两个字符的宽度 */
  line-height: 1.6;
}

/*
.page-head {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px; 添加内边距，使内容与边框有一定距离
} */

.el-text {
  display: block; /* 将 el-text 设置为块级元素 */
  margin-bottom: 10px; /* 添加下外边距，增加各段落之间的间距 */
  text-indent: 2em; /* 添加文本缩进，每段开头空两个字符的宽度 */
}

.attachment {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.attachment-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  margin-right: 5px;
}

.attachment-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.download-link {
  color: #007bff; /* 自定义下载链接颜色 */
  text-decoration: none;
  cursor: pointer;
}

.download-link:hover {
  text-decoration: underline;
}
</style>
@/store/login.js
