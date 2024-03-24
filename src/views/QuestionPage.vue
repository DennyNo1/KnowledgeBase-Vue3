<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowLeft, CaretTop, ChatLineRound } from "@element-plus/icons-vue";
import Heart from "@/components/icons/Heart.vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import RichText from "@/components/RichText.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login.js";
import { oneQuestion } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
import { useRouter } from "vue-router";

const router = useRouter();

// dayjs.extend(duration);

const valueHtml = ref("");
const toolbarConfig = {};
const mode = "default"; // 或 'simple'
const editorRef = ref();
const question = ref({
  date: "2024-01-17T09:45:38",
  title: "问答留言板",
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
  text: [
    {
      title: "回复1",
      date: "2024-01-17T09:45:38",
      content: "内容",
      commend: 0,
      isLiked: false,
      openRepl: false,
      openText: false,
      user: {
        name: "用户1",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        tag: "楼主",
      },
      repl: [
        {
          title: "回复1-1",
          content: "内容",
          commend: 0,
          isLiked: false,
          user: {
            name: "用户1",
            avatar:
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          },
        },
        {
          title: "回复1-2",
          content: "内容",
          commend: 0,
          isLiked: false,
          user: {
            name: "用户1",
            avatar:
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          },
        },
      ],
    },
    {
      title: "回复2",
      date: "2024-01-17T09:45:38",
      content: "内容",
      commend: 0,
      isLiked: false,
      openRepl: false,
      openText: false,
      user: {
        name: "用户1",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      },
    },
    {
      title: "回复3",
      date: "2024-01-17T09:45:38",
      content: "内容",
      commend: 0,
      isLiked: false,
      openRepl: false,
      openText: false,
      user: {
        name: "用户1",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        tag: "楼主",
      },
    },
    {
      title: "回复4",
      date: "2024-01-17T09:45:38",
      content: "内容",
      commend: 0,
      isLiked: false,
      openRepl: false,
      openText: false,
      user: {
        name: "用户1",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        tag: "楼主",
      },
    },
  ],
});

function goBack() {
  router.back();
}

function commit() {
  console.log(valueHtml.value);
}

function cancel(item) {
  item.openText = false;
}

function toggleLike(item) {
  // console.log(item);
  // 切换点赞状态
  item.isLiked = !item.isLiked;
  // 根据点赞状态更新点赞数量
  if (item.isLiked) {
    item.commend += 1;
  } else {
    item.commend -= 1;
  }
}

function toggleLike2(item) {
  // console.log(item);
  // 切换点赞状态
  item.isLiked = !item.isLiked;
  // 根据点赞状态更新点赞数量
  if (item.isLiked) {
    item.commend += 1;
  } else {
    item.commend -= 1;
  }
}

function handleRepl(item) {
  item.openText = true;
  item.openRepl = true;

  console.log("回复");
}

// onMounted(() => {
//  getQuestion()
// })

const route = useRoute();
const id = route.query.id || 1;

const store = useLoginStore();
const { userInfo } = storeToRefs(store);

async function getQuestion() {
  try {
    const response = await oneQuestion(id, userInfo.value.userId);
    question.value = response.data;
  } catch (error) {
    console.log("请求失败！", error);
  }
}
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
  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-page-header :icon="ArrowLeft" @back="goBack">
        <template #content>
          <!--          <span class="text-large"> {{ description.tittle }} </span>-->
          <h2>{{ question.title }}</h2>
        </template>
      </el-page-header>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="问题信息">
        <el-descriptions-item label="用户名">{{
          question.username
        }}</el-descriptions-item>
        <el-descriptions-item label="创建日期">{{
          dayjs(question.date).format("YYYY-MM-DD")
        }}</el-descriptions-item>
        <el-descriptions-item label="地点">{{
          question.place
        }}</el-descriptions-item>
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
      <h3>回复</h3>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="17">
      <!-- <div class="article">
          <el-text v-for="t in question.text"> {{ t }} </el-text>
      </div>
      <el-divider /> -->
      <el-timeline>
        <el-timeline-item
          v-for="t in question.text"
          :timestamp="dayjs(t.date).format('YYYY-MM-DD')"
          placement="top"
        >
          <el-card shadow="hover" style="border-radius: 0.5rem">
            <div class="replyHeader">
              <el-avatar class="" :size="32" :src="t.user.avatar" />
              <span class="text-large"> {{ t.user.name }} </span>
              <span
                class="text-small"
                style="color: var(--el-text-color-regular)"
              >
                <!-- {{ getDuration(t.date) }} -->
              </span>
              <el-tag v-if="t.user.tag">{{ t.user.tag }}</el-tag>
              <div class="flex-grow" />
              <el-button type="primary" text @click="handleRepl(t)"
                >回复</el-button
              >
            </div>

            <h4>{{ t.title }}</h4>
            <p>{{ t.content }}</p>
            <div class="replyFooter">
              <el-button
                type="primary"
                :icon="CaretTop"
                :plain="!t.isLiked"
                @click="toggleLike(t)"
                >赞同&nbsp;{{ t.commend }}
              </el-button>
              <el-badge :value="t.repl.length" v-if="t.repl" class="">
                <el-button
                  :icon="ChatLineRound"
                  @click="t.openRepl = !t.openRepl"
                  >展开回复</el-button
                >
              </el-badge>
            </div>

            <div v-if="t.repl">
              <div v-show="t.openRepl">
                <el-row>
                  <div style="margin-top: 20px; width: 100%"></div>
                  <!-- <el-col :span="0.5"></el-col> -->
                  <el-col>
                    <el-card shadow="always" style="border-radius: 0.5rem">
                      <div class="subRepl" v-for="item in t.repl">
                        <div class="subReplHeader">
                          <el-avatar
                            class=""
                            :size="24"
                            :src="item.user.avatar"
                          />
                          <span class="text-med"> {{ t.user.name }} </span>

                          <div class="flex-grow" />
                          <el-button
                            type="primary"
                            text
                            @click="toggleLike2(item)"
                            :icon="item.isLiked ? HeartFilled : Heart"
                            >{{ item.commend }}
                          </el-button>
                        </div>
                        <el-row>
                          <el-col :span="1"></el-col>
                          <el-col :span="23">
                            <el-text>
                              {{ item.content }}
                            </el-text>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-if="t.openText" style="margin-top: 20px">
              <RichText
                v-model="valueHtml"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <el-row style="margin-top: 15px">
                <div class="flex-grow" />
                <el-button @click="cancel(t)" text>取消</el-button>
                <el-button type="primary" @click="commit" text>提交</el-button>
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
      <h4>添加回复</h4>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <!-- 放置富文本组件 -->
      <RichText
        v-model="valueHtml"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
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
        <el-button type="primary" @click="commit">提交</el-button>
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
</style>
@/store/login.js
