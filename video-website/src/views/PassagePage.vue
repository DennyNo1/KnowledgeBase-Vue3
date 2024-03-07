<script setup>
import { ArrowLeft } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import Comment from "@/components/Comment.vue";
import { useRoute } from "vue-router";
import { useLoginStore } from "@/stores/login.js";
import { storeToRefs } from "pinia";
import { oneArticle } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  router.back();
}

// onMounted(() => {
//   getPassage()
// })

const passage = ref({
  id: 1,
  type: "装维",
  uploaderId: 2,
  date: "2024-01-17T09:42:28",
  author: "张三",
  department: "智能云",
  sort: "案例",
  tag: [
    { type: "", label: "投诉案例" },
    { type: "success", label: "核心网" },
    { type: "info", label: "投诉分享" },
    { type: "danger", label: "核心网投诉" },
    { type: "warning", label: "案例分享" },
  ],
  content:
    "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。".split(
      "\r\n\r\n"
    ),
  clickCount: "0",
  title: "中国电信联合发布国家级人工智能大模型服务",
});

const commentSrc = ref("");
const commentData = ref([]);

const route = useRoute();
const id = route.query.id || 1;

const store = useLoginStore();
const { userInfo } = storeToRefs(store);

async function getPassage() {
  try {
    const response = await oneArticle(id, userInfo.value.userId);
    passage.value = response.data[0];
    // 对文章数据进行分段
    passage.value.content = passage.value.content.split("\r\n\r\n");
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
      <el-page-header :icon="ArrowLeft" @back="goBack">
        <template #content>
          <!--          <span class="text-large"> {{ description.tittle }} </span>-->
          <h2>{{ passage.title }}</h2>
        </template>
      </el-page-header>
      <br />
      <el-descriptions title="文章信息" :column="4">
        <el-descriptions-item label="发布时间">
          {{ dayjs(passage.date).format("YYYY-MM-DD") }}
        </el-descriptions-item>
        <el-descriptions-item label="作者">
          {{ passage.author }}
        </el-descriptions-item>
        <el-descriptions-item label="部门">
          {{ passage.department }}
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag size="small"> {{ passage.sort }} </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="知识标签">
          <el-tag
            v-for="t in passage.tag"
            :key="t.label"
            effect="plain"
            :type="t.type"
            :round="true"
            style="margin-right: 0.5rem"
            >{{ t.label }}</el-tag
          >
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row style="margin-top: 30px; margin-bottom: 10px">
    <el-col :span="4" />
    <el-col :span="16">
      <el-text class="passage" v-for="t in passage.content"> {{ t }} </el-text>
      <el-divider style="margin-top: 30px" />
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <h3>评论</h3>
      <Comment :comment-src="commentSrc" />
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

.passage {
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
</style>
