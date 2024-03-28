<script setup>
import { onMounted, ref } from "vue";
import { ArrowLeft, CaretTop, ChatLineRound } from "@element-plus/icons-vue";
import Heart from "@/components/icons/Heart.vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import RichText from "@/components/RichText.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login.js";

import dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
import { useRouter } from "vue-router";
import { userOneQuestionService } from "@/api/question.js";
import {
  userCommentAndReplyService,
  useraddCommentService,
  useraddReplyService,
} from "@/api/comment.js";
import { ElMessage } from "element-plus";
import { watch } from 'vue'
import{userLikeService} from '@/api/comment.js'


const loginStore = useLoginStore();
const router = useRouter();

// dayjs.extend(duration);

const valueHtml = ref("");
const toolbarConfig = {};
const mode = "default"; // 或 'simple'
const editorRef = ref();
// const question = ref({
//   date: "2024-01-17T09:45:38",
//   title: "这是问题的标题",
//   username: "用户1",
//   place: "舟山电信",
//   main: [
//     "在短期内，这位前总统赢得了第一名之外的额外奖励：由于他的两位主要竞争对手在爱荷华州的亚军争夺战中实力接近，佛罗里达州州长罗恩·德桑蒂斯（Ron DeSantis）和前联合国大使尼基·黑利（Nikki Haley）之间的竞争有望持续到新罕布什尔州及其他州。",
//     "德桑提斯计划周二访问南卡罗来纳州，表明他打算坚持到底——该州将在一个多月后举行初选。他在爱荷华州获得第二名的成绩只会强化这一决定，让他的团队和盟友有理由筹集更多资金。但与第一名的差距过于悬殊，让人无法感到安慰或高兴。",
//     "去年大部分时间里，黑利在爱荷华州的民意调查结果都是个位数，她没什么钱，也没有现场组织，她错过了将德桑蒂斯淘汰出局的机会。不过，她正在转向对她友好得多的新罕布什尔州，一些民调显示，她在那里与川普的差距不大。",
//     "对德桑蒂斯来说，好消息是他的支持者依然热情高涨，坏消息是情况与全美其他地区一样：他只剩下最坚定的选民，他几乎失去了其他人。在爱荷华州，他参加了数百场活动，超级政治行动委员会为支持他花费了数千万美元，但地图上没有一个明显的地方能让他取得胜利。在新罕布什尔州，他远远落后于川普和黑利。",
//     "川普有望在内华达州党团会议上一扫颓势，海利没有参加该州的党团会议。南卡罗来纳州长期以来一直是川普的地盘，而黑利是该州的前州长。这意味着，从现在到2月底，德桑蒂斯将必须在残酷的选战中留住他的捐赠者和支持者。比尔·克林顿（Bill Clinton）在1992年新罕布什尔州民主党初选中出人意料地获得第二名后，曾宣称自己是 “卷土重来的孩子”。德桑提斯可以理直气壮地宣称他在周一晚上的结果是个意外——在NBC新闻/德梅因纪事/Mediacom的最终民调中，黑利以20%对16%的优势领先他4个百分点——但这并不是成功的预兆。",
//     "除非德桑蒂斯找到一种方法，开始在他落后的州从川普和黑利那里赢得大量选民——“除非他在那里做了大量工作”，则他不会成为 “卷土重来的孩子”。黑利的拜登问题",
//     "在爱荷华州、新罕布什尔州和其他许多州，黑利无疑是“绝不川普”选民（受过大学教育的共和党人、无党派人士和跨党派民主党人）的最爱。但她正在竞选一个仍然牢牢受川普控制的政党的提名。",
//     "在NBC新闻/德梅因纪事/Mediacom进行的爱荷华州选前民调中，43%的黑利支持者表示，如果乔·拜登（Joe Biden）总统在11月与川普对决，他们会把票投给拜登。只有9%的黑利支持者表示，他们非常热衷于支持她。",
//   ],
//   text: [
//     {
//       title: "回复1",
//       date: "2024-01-17T09:45:38",
//       content: "内容",
//       commend: 0,
//       isLiked: false,
//       openRepl: false,
//       openText: false,
//       user: {
//         name: "用户1",
//         avatar:
//           "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//         tag: "楼主",
//       },
//       repl: [
//         {
//           title: "回复1-1",
//           content: "内容",
//           commend: 0,
//           isLiked: false,
//           user: {
//             name: "用户1",
//             avatar:
//               "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//           },
//         },
//         {
//           title: "回复1-2",
//           content: "内容",
//           commend: 0,
//           isLiked: false,
//           user: {
//             name: "用户1",
//             avatar:
//               "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//           },
//         },
//       ],
//     },
//     {
//       title: "回复2",
//       date: "2024-01-17T09:45:38",
//       content: "内容",
//       commend: 0,
//       isLiked: false,
//       openRepl: false,
//       openText: false,
//       user: {
//         name: "用户1",
//         avatar:
//           "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//       },
//     },
//     {
//       title: "回复3",
//       date: "2024-01-17T09:45:38",
//       content: "内容",
//       commend: 0,
//       isLiked: false,
//       openRepl: false,
//       openText: false,
//       user: {
//         name: "用户1",
//         avatar:
//           "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//         tag: "楼主",
//       },
//     },
//     {
//       title: "回复4",
//       date: "2024-01-17T09:45:38",
//       content: "内容",
//       commend: 0,
//       isLiked: false,
//       openRepl: false,
//       openText: false,
//       user: {
//         name: "用户1",
//         avatar:
//           "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//         tag: "楼主",
//       },
//     },
//   ],
// });

function goBack() {
  router.back();
}

function cancel(item) {
  item.openText = false;
}

//点赞回答
async function   toggleLike(commentId,liked) {
   console.log(commentId);
   console.log(liked);

  //先判断是否登录
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能进行该操作",
      type: "warning",
    });
    return;
  }
  //如果从没点过赞
  if(!liked)
  {
    await userLikeService(loginStore.userInfo.id,"comment",commentId)
    await getCommentsSection()
  }
  else{
    ElMessage({
      message: "不可重复点赞回答",
      type: "primary",
    });
    return
  }
}

  









// function toggleLike2(item) {
//   // console.log(item);
//   // 切换点赞状态
//   item.isLiked = !item.isLiked;
//   // 根据点赞状态更新点赞数量
//   if (item.isLiked) {
//     item.commend += 1;
//   } else {
//     item.commend -= 1;
//   }
// }

function handleRepl(item) {
  item.openText = !item.openText;
  item.openRepl = true;

  console.log("回复");
}

onMounted(() => {
  getQuestion();
  getCommentsSection();
});

const route = useRoute();
const id = route.query.id;

const store = useLoginStore();
const { userInfo } = storeToRefs(store);

import { userQuestionListService } from "@/api/question";
// 获取问题基本的数据
const question = ref({});
const user = ref({});

const getQuestion = async () => {
  try {
    const response = await userOneQuestionService(id);
    question.value = response.data.question;
    user.value = response.data.user;
    console.log(question);
  } catch (error) {
    console.log("请求失败！", error);
  }
};

// 获取评论区
const commentData = ref({});
const getCommentsSection = async () => {
  try {
    const response = await userCommentAndReplyService("question", id,loginStore.userInfo.id);
    console.log(response);
    commentData.value = response.data;
  } catch (error) {
    console.log("请求失败！", error);
  }
};

//提交回答或回复
async function commit(commentId)
{
  //先做登录判断
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能进行该操作",
      type: "warning",
    });
  } else {
    //不能提交空评论
    if (valueHtml.value == "") {
      ElMessage({
        message: "请输入内容",
        type: "warning",
      });
    }
    //通过了用户登录和输入框不为空的判断
    else {
      //异步操作切记加入await
      if (commentId == null) {
        await useraddCommentService(
          "question",
          id,
          loginStore.userInfo.id,
          valueHtml.value

        );
      } else {
        useraddReplyService(
          valueHtml.value,
          await loginStore.userInfo.id,
          commentId,
          null
        );


      }

      await getCommentsSection();
      valueHtml.value = "";
    }
  }
}

// 如果登录状态变化，就重新获取评论区
watch(
  () => loginStore.userInfo.id,
  (newId, oldId) => {
    if (newId !== oldId) {
     console.log(loginStore.userInfo.id)
     //重新获取以下评论区的页面
     getCommentsSection();
    }
  },
  { immediate: true } // 设置immediate为true，表示在监听开始时立即执行一次
);


//
// function test() {
//   const date = '2024-01-17T09:45:38'
//   console.log(dayjs.duration(dayjs(date).diff(dayjs())))
// }
// test()

// function getDuration(date) {
//   const duration = dayjs.duration(dayjs().diff(dayjs(date)));
//   if (duration.asSeconds() < 60) {
//     return Math.floor(duration.asSeconds()) + " 秒前";
//   } else if (duration.asMinutes() < 60) {
//     return Math.floor(duration.asHours()) + " 分钟前";
//   } else if (duration.asHours() < 24) {
//     return Math.floor(duration.asHours()) + " 小时前";
//   } else {
//     return Math.floor(duration.asDays()) + " 天前";
//   }
// }
</script>

<template>
  <el-row class="page-header">
    <el-col :span="4" />

    <el-col :span="16">
      <div class="header-content">
        <el-button @click="goBack" size="large" style="font-size: 18px"
          >返回</el-button
        >
        <h2 class="title">{{ question.title }}</h2>

        <div class="meta-info">
          <span>上传者：{{ user.nickName }}</span>

          <span>部门：{{ user.department }}</span>

          <span>上传时间：{{ question.date }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="问题描述"> </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-text class="article" size="large"> {{ question.content }}</el-text>
      <el-divider style="margin-top: 30px" />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <h3>回复</h3>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <!-- 评论区 -->
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="17">
      <el-timeline>
        <el-timeline-item
          v-for="t in commentData"
          :timestamp="dayjs(t.comment.date).format('YYYY-MM-DD')"
          placement="top"
        >
          <el-card shadow="hover" style="border-radius: 0.5rem">
            <div class="replyHeader">
              <el-avatar class="" :size="32" :src="t.user.avatar" />
              <span class="text-large"> {{ t.user.nickName }} </span>
              <span
                class="text-small"
                style="color: var(--el-text-color-regular)"
              >
              </span>
              <el-tag v-if="t.user.tag">{{ t.user.tag }}</el-tag>
              <div class="flex-grow" />
              <el-button type="primary" text @click="handleRepl(t)"
                >回复</el-button
              >
            </div>

            <!-- <h4>{{ t.title }}</h4> -->
            <p>{{ t.comment.content }}</p>
            <div class="replyFooter">
              <el-button
                type="primary"
                :icon="CaretTop"
                :plain="!t.liked"
                @click="toggleLike(t.comment.id, t.liked)"
                >赞同&nbsp;{{ t.comment.likeCount }}
              </el-button>

              <el-badge
                :value="t.replyDTOList.length"
                v-if="t.replyDTOList"
                class=""
              >
                <el-button
                  :icon="ChatLineRound"
                  @click="t.openRepl = !t.openRepl"
                  >展开回复</el-button
                >
              </el-badge>
            </div>

            <div v-if="t.replyDTOList.length > 0">
              <div v-show="t.openRepl">
                <el-row>
                  <div style="margin-top: 20px; width: 100%"></div>

                  <el-col>
                    <el-card shadow="always" style="border-radius: 0.5rem">
                      <div class="subRepl" v-for="item in t.replyDTOList">
                        <div class="subReplHeader">
                          <el-avatar
                            class=""
                            :size="24"
                            :src="item.user.avatar"
                          />
                          <span class="text-med">
                            {{ item.user.nickName }}
                          </span>

                          <div class="flex-grow"></div>
                          <!-- 先不做评论的点赞功能 -->
                          <!-- <el-button
                            type="primary"
                            text
                            @click="toggleLike2(item)"
                            :icon="item.isLiked ? HeartFilled : Heart"
                            >{{ item.commend }}
                          </el-button> -->
                        </div>
                        <el-row>
                          <el-col :span="1"></el-col>
                          <el-col :span="23">
                            <el-text>
                              {{ item.reply.content }}
                            </el-text>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- 评论框 -->
            <div v-if="t.openText" style="margin-top: 20px">
              <!-- <RichText
                v-model="valueHtml"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              /> -->
              <el-input
                type="textarea"
                placeholder="请输入你的回复..."
                resize="none"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 3, maxRows: 25 }"
                v-model="valueHtml"
              ></el-input>
              <el-row style="margin-top: 15px">
                <div class="flex-grow" />
                <!-- <el-button @click="cancel(t)" text>取消</el-button> -->
                <el-button type="primary" @click="commit(t.comment.id)" text
                  >提交</el-button
                >
              </el-row>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <h4>添加回答</h4>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <!-- 放置富文本组件 -->
      <!-- <RichText
        v-model="valueHtml"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      /> -->
      <el-input
        v-model="valueHtml"
        type="textarea"
        placeholder="请输入你的回答..."
        resize="none"
        maxlength="1000"
        show-word-limit
        :autosize="{ minRows: 6, maxRows: 50 }"
      />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-row>
        <div class="flex-grow" />
        <!-- <el-button type="primary" @click="cancel">取消</el-button> -->
        <el-button type="primary" @click="commit()">提交</el-button>
      </el-row>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.article {
  display: block; /* 将 el-text 设置为块级元素 */
  margin-bottom: 10px; /* 添加下外边距，增加各段落之间的间距 */
  text-indent: 2em; /* 添加文本缩进，每段开头空两个字符的宽度 */
  line-height: 1.6;
}

.replyHeader {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* .replyFooter{
    margin-bottom: 20px;
} */

.replyHeader > * {
  margin-right: 10px;
}

.replyHeader > *:last-child {
  margin-right: 0;
}

.text-large {
  font-weight: 600;
  font-size: 18px;
}

.text-med {
  font-weight: 600;
  font-size: 14px;
}

.text-small {
  font-size: 14px;
}

.subRepl {
  margin-bottom: 10px;
}

.subRepl:last-child {
  margin-bottom: 0;
}

.subReplHeader {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.subReplHeader > * {
  margin-right: 8px;
}

.subReplHeader > *:last-child {
  margin-right: 0;
}

.replyFooter > * {
  margin-right: 10px;
}

.replyFooter > *:last-child {
  margin-right: 0;
}

.flex-grow {
  flex-grow: 1;
}

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
</style>
