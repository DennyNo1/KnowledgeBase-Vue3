<script setup>
import { handleError, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import {userCheckService} from "@/api/question.js";
const router = useRouter();
const question = ref({
  date: "2024-01-17T09:45:38",
  title: "这是问题的标题",
  username: "用户1",
  place: "舟山电信",
  main: [
    "在短期内，这位前总统赢得了第一名之外的额外奖励：由于他的两位主要竞争对手在爱荷华州的亚军争夺战中实力接近，佛罗里达州州长罗恩·德桑蒂斯（Ron DeSantis）和前联合国大使尼基·黑利（Nikki Haley）之间的竞争有望持续到新罕布什尔州及其他州。",
    "德桑提斯计划周二访问南卡罗来纳州，表明他打算坚持到底——该州将在一个多月后举行初选。他在爱荷华州获得第二名的成绩只会强化这一决定，让他的团队和盟友有理由筹集更多资金。但与第一名的差距过于悬殊，让人无法感到安慰或高兴。",
    "去年大部分时间里，黑利在爱荷华州的民意调查结果都是个位数，她没什么钱，也没有现场组织，她错过了将德桑蒂斯淘汰出局的机会。不过，她正在转向对她友好得多的新罕布什尔州，一些民调显示，她在那里与川普的差距不大。",
    "对德桑蒂斯来说，好消息是他的支持者依然热情高涨，坏消息是情况与全美其他地区一样：他只剩下最坚定的选民，他几乎失去了其他人。在爱荷华州，他参加了数百场活动，超级政治行动委员会为支持他花费了数千万美元，但地图上没有一个明显的地方能让他取得胜利。在新罕布什尔州，他远远落后于川普和黑利。",
    "川普有望在内华达州党团会议上一扫颓势，海利没有参加该州的党团会议。南卡罗来纳州长期以来一直是川普的地盘，而黑利是该州的前州长。这意味着，从现在到2月底，德桑蒂斯将必须在残酷的选战中留住他的捐赠者和支持者。比尔·克林顿（Bill Clinton）在1992年新罕布什尔州民主党初选中出人意料地获得第二名后，曾宣称自己是 “卷土重来的孩子”。德桑提斯可以理直气壮地宣称他在周一晚上的结果是个意外——在NBC新闻/德梅因纪事/Mediacom的最终民调中，黑利以20%对16%的优势领先他4个百分点——但这并不是成功的预兆。",
    "除非德桑蒂斯找到一种方法，开始在他落后的州从川普和黑利那里赢得大量选民——“除非他在那里做了大量工作”，则他不会成为 “卷土重来的孩子”。黑利的拜登问题",
    "在爱荷华州、新罕布什尔州和其他许多州，黑利无疑是“绝不川普”选民（受过大学教育的共和党人、无党派人士和跨党派民主党人）的最爱。但她正在竞选一个仍然牢牢受川普控制的政党的提名。",
    "在NBC新闻/德梅因纪事/Mediacom进行的爱荷华州选前民调中，43%的黑利支持者表示，如果乔·拜登（Joe Biden）总统在11月与川普对决，他们会把票投给拜登。只有9%的黑利支持者表示，他们非常热衷于支持她。",
  ],
});

function goBack() {
  // console.log(videoData.value.url)
  router.back();
}
const handleCheck=(isChecked)=>{
    const questionId=router.currentRoute.value.query.id;
    console.log(isChecked)
    userCheckService(questionId,isChecked)
    goBack()
}

</script>



<template>
  
  <el-row class="page-header">
    <el-col :span="4" />
    
    <el-col :span="16">
      <div class="header-content">
        <el-button
         
          @click="goBack"
          size="large"
          style="font-size: 18px"
          >返回</el-button
        >
        <h2 class="title">{{ question.title }}</h2>

        <div class="meta-info">
          <span>上传者：{{ question.username }}</span>

          <span>部门：{{ question.place }}</span>

          <span>上传时间：{{ question.date }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="问题描述">
        <!-- <el-descriptions-item label="用户昵称">{{
          question.username
        }}</el-descriptions-item>
        <el-descriptions-item label="创建日期">{{
          dayjs(question.date).format("YYYY-MM-DD")
        }}</el-descriptions-item>
        <el-descriptions-item label="部门">{{
          question.place
        }}</el-descriptions-item> -->
      </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-text class="article" v-for="t in question.main"> {{ t }}</el-text>
      <el-divider style="margin-top: 30px" />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-button type="success" size="large" class="check-pass" @click="handleCheck(1)">审核通过</el-button>
      <el-button type="info" size="large"  @click="handleCheck(-1)">审核不予通过</el-button>
      </el-col>
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
  margin-bottom: 10px;
}
.meta-info span:not(:last-child) {
  margin-right: 10px; /* 调整此处的数值以适应您的需求 */
}
.check-pass{
    margin-right: 20px;
}
</style>
