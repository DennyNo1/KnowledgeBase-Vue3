<script setup>
import { onMounted, ref } from "vue";
import { ArrowLeft, CaretTop, ChatLineRound } from "@element-plus/icons-vue";
import Heart from "@/components/icons/Heart.vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import RichText from "@/components/RichText.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login.js";
import avatar from '@/assets/default.png'
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
const loginStore=useLoginStore()


const router = useRouter();

// dayjs.extend(duration);

const valueHtml = ref("");
const toolbarConfig = {};
const mode = "default"; // 或 'simple'
const editorRef = ref();

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
      message: "您已点赞过该回答",
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
  //先做回复权限的判断
  if (question.value.assignTo!=loginStore.userInfo.role&&loginStore.userInfo.role!='admin') {
    // console.log(question.value)
    // console.log(loginStore.userInfo.role)
    ElMessage({
      message: "管理员并没有将这个问题派单给您，请联系管理员后再进行操作",
      type: "warning",
    });
    return
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
  <el-row style="margin-bottom: 1rem;">
    <el-col :span="4" />

    <el-col :span="16">

      <h2 style="font-size: 2rem;margin-bottom: 0%">{{ question.title }}</h2>
      <br />
      <el-descriptions title="问题信息" column="6">
        <el-descriptions-item>
          <el-icon><View /></el-icon>&nbsp&nbsp{{ question.clickCount }}
        </el-descriptions-item>
        <el-descriptions-item label="发布人">
          {{ user.nickName }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ user.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="部门">
          {{ user.department }}
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag> {{ question.type }} </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="发布时间">
          <!-- {{ dayjs(videoData.date).format("YYYY-MM-DD") }} -->
          {{ question.date }}
        </el-descriptions-item>
      </el-descriptions>


    </el-col>
    <el-col :span="4" />
  </el-row>

  <el-row style="margin-bottom: 0%;">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-descriptions title="问题描述"> </el-descriptions>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row >
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

  <!-- <el-row style="margin-bottom:0" v-if="loginStore.userInfo.isLoggedIn&&loginStore.userInfo.admin!='user'">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <h4>添加回复</h4>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row> -->

  <!-- 添加回复框，游客和普通用户是无法看到回复框的 -->
  <el-row v-if="loginStore.isLoggedIn&&loginStore.userInfo.role!='user'">
    <el-col :span="4" ></el-col>
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
        placeholder="请输入你的回复..."
        resize="none"
        maxlength="1000"
        show-word-limit
        :autosize="{ minRows: 6, maxRows: 50 }"
      />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <el-row v-if="loginStore.isLoggedIn&&loginStore.userInfo.role!='user'">
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







  

  <!-- 回复区 -->
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
              <!-- 都先采用默认头像 -->
              <el-avatar class="" :size="32" :src="avatar" />
              <span class="text-large"> {{ t.user.nickName }} </span>
<!--               
              <span
                class="text-small"
                style="color: var(--el-text-color-regular)"
              >
              </span> -->
              <span v-if="t.user.role=='admin'">慧问工作室</span>
              <span v-if="t.user.role=='business'">营业专家</span>
              <span v-if="t.user.role=='maintain'">装维专家</span>
              <span v-if="t.user.role=='govermentManager'">政企客户经理专家</span>
              <span v-if="t.user.role=='customerManager'">客经专员专家</span>
              <span v-if="t.user.role=='director'">支局长专家</span>
              <span v-if="t.user.role=='areaManager'">片区长专家</span>
              <span v-if="t.user.role=='VIPManager'">VIP客户经理专家</span>
              
              <span>{{t.user.phone}}</span>
              <el-tag v-if="t.user.tag">{{ t.user.tag }}</el-tag>
              <div class="flex-grow" />
              <!-- <el-button type="primary" text @click="handleRepl(t)"
                >回复</el-button
              > -->
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

              <!-- <el-badge
                :value="t.replyDTOList.length"
                v-if="t.replyDTOList"
                class=""
              >
                <el-button
                  :icon="ChatLineRound"
                  @click="t.openRepl = !t.openRepl"
                  >展开回复</el-button
                >
              </el-badge> -->
            </div>

            <!-- <div v-if="t.replyDTOList.length > 0">
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
            </div> -->
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
  /* align-items: center;
  margin-bottom: 10px; */
  align-items: flex-end; 
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
