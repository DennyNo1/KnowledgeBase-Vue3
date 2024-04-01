<script setup>
import { onMounted, ref } from "vue";
import { ChatLineRound, View } from "@element-plus/icons-vue";

import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import {userArticleListService} from '@/api/article.js'

const articleData=ref({})
async function getArticleList(page,pageSize,queryName,type){
  try{
    const response=await userArticleListService(page,pageSize,queryName,type)
    // console.log(response.data)
    articleData.value=response.data.records
    console.log(articleData.value)

  }
  catch (error) {
    console.log("请求失败！", error);
  

}}
onMounted(() => {
  getArticleList("1", "6", null, null);
});
// const articleData = ref([
//   {
//     article: {
//       id: 1,
//       type: "装维",
//       uploaderId: 2,
//       date: "2024-01-17T09:42:28",
//       content:
//         "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
//       clickCount: 10,
//       title:
//         "测试标题长度。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
//       commentCount: 1,
//     },
//     nickName: "李松泽",
//     department: "软研中心",
//   },
//   {
//     article: {
//       id: 2,
//       type: "营业员",
//       uploaderId: 3,
//       date: "2024-01-25T16:30:46",
//       content:
//         "2024年1月23日2时09分，新疆阿克苏地区乌什县（北纬41.26度，东经78.63度）发生7.1级地震。地震发生后，中国电信新疆阿克苏分公司第一时间启动地震应急通信保障预案，携应急保障车奔赴乌什地震指挥部现场指挥。\r\n\r\n\r\n\r\n\r\n\r\n乌什县网络保障人员从凌晨2时20分开始，在全县开展网络机房巡检，对震区网络指标加强监测，确保当地网络畅通。截至早晨6时，累计安排53名应急保障人员、应急通信车7辆、发电机4台、卫星电话10部，恢复退服基站27处，修复电力故障8处，目前乌什通信网络正在有序恢复中。",
//       clickCount: 99,
//       title:
//         "新疆乌什县突发7.1级地震，中国电信连夜出动，确保地震灾害地区通信畅通",
//       commentCount: 0,
//     },
//     nickName: "张睿阳",
//     department: "软研中心",
//   },
//   {
//     article: {
//       id: 3,
//       type: "装维",
//       uploaderId: 2,
//       date: "2024-01-17T09:42:28",
//       content:
//         "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
//       clickCount: 10,
//       title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
//       commentCount: 1,
//     },
//     nickName: "李松泽",
//     department: "软研中心",
//   },
//   {
//     article: {
//       id: 4,
//       type: "装维",
//       uploaderId: 2,
//       date: "2024-01-17T09:42:28",
//       content:
//         "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
//       clickCount: 10,
//       title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
//       commentCount: 1,
//     },
//     nickName: "李松泽",
//     department: "软研中心",
//   },
//   {
//     article: {
//       id: 5,
//       type: "装维",
//       uploaderId: 2,
//       date: "2024-01-17T09:42:28",
//       content:
//         "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
//       clickCount: 10,
//       title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
//       commentCount: 1,
//     },
//     nickName: "李松泽",
//     department: "软研中心",
//   },
//   {
//     article: {
//       id: 6,
//       type: "装维",
//       uploaderId: 2,
//       date: "2024-01-17T09:42:28",
//       content:
//         "近日，中国电信联合清华大学等相关单位制定的《人工智能-大模型预训练模型-服务能力成熟度评估》标准，顺利通过工业和信息化部认证，成为国家级标准，并在工信部人工智能检验检测基础服务平台发布。标准为评估大模型能力水平提供了全面的检测手段，对行业大模型的发展具有重要意义。\r\n\r\n\r\n\r\n标准提出了大模型预训练服务能力成熟度评估框架，规定了大模型预训练模型服务的能力要求、成熟度等级及评估方法。\r\n\r\n在服务能力方面，预训练成熟度能力域包括平台、开发定制、推理及应用等服务，预训练大模型平台服务关注大模型开发定制的IT环境，模型开发定制服务关注大模型开发状态，模型推理及应用域关注大模型的运行状态。\r\n\r\n在成熟度等级方面，模型服务成熟度等级划分为基础应用级、协同优化级、自定义生产级三类，对预训练模型基础技术、服务复杂度和定制化能力等要求逐步提高。\r\n\r\n在评估方法方面，标准对预训练服务能力进行全面评估，提出各成熟等级应具备的预训练能力和关键性能指标，为大模型预训练服务能力建设提供指导。\r\n\r\n以大模型为代表的新一轮人工智能技术是科技革命和产业变革的重要驱动力。中国电信持续加强核心技术攻关,重点推动基础通用大模型向垂直行业大模型的纵深演进，围绕教育、政务、农业、应急等行业领域，预计将发布精准教学大模型、政务服务大模型、神农一号大模型、应急大模型等共计40个行业大模型。",
//       clickCount: 10,
//       title: "中国电信联合发布国家级人工智能大模型服务能力成熟度评估标准",
//       commentCount: 1,
//     },
//     nickName: "李松泽",
//     department: "软研中心",
//   },
// ]);

const router = useRouter();
const route = useRoute();



// onMounted(() => {
//   getarticles()
// })

async function getarticles() {
  try {
    const response = await someArticles(page, pageSize, queryName);
    // console.log(response.data);
    articleData.value = response.data["records"];
    totalPage.value = response.data.total;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

function handleClick(item) {
  // console.log('点击了卡片')
  // console.log(item)
  router.push(`/article-page?id=${item.article.id}`);
}

function handleCurrentChange(currentPage) {
  // 获取点击的页码
  console.log(currentPage);
  page = currentPage;
  getarticles();
}

function handleItemClick(index) {
  if (index !== queryName) {
    queryName = index;
    getarticles();
  }
}
</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          :default-active="`article${route.hash}`"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="article" @click="handleItemClick('')"
            >默认</el-menu-item
          >
          <el-menu-item
            index="article#commend"
            @click="handleItemClick('commend')"
            >热门知识</el-menu-item
          >
          <el-menu-item
            index="article#business"
            @click="handleItemClick('business')"
            >营业</el-menu-item
          >
          <el-menu-item
            index="article#operation"
            @click="handleItemClick('operation')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="article#manager"
            @click="handleItemClick('manager')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item
            index="article#commissioner"
            @click="handleItemClick('commissioner')"
            >客经专员</el-menu-item
          >
          <el-menu-item
            index="article#director"
            @click="handleItemClick('director')"
            >支局长</el-menu-item
          >
          <el-menu-item
            index="article#distinct"
            @click="handleItemClick('distinct')"
            >片区长</el-menu-item
          >
          <el-menu-item
            index="article#distinct"
            @click="handleItemClick('vipManager')"
            >VIP客户经理</el-menu-item
          >
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="2" />
  </el-row>


  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
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
            <el-col :span="8">
              <el-text
                >发布时间：
                <time>{{
                  dayjs(item.article.date).format("YYYY-MM-DD")
                }}</time></el-text
              >
            </el-col>
            <el-col :span="4">
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
      :page-count="totalPage"
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
</style>
