<script setup>
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import Heart from "@/components/icons/Heart.vue";
import CommentFilled from "@/components/icons/CommentFilled.vue";
import Comment from "@/components/icons/Comment.vue";
import { useRoute, useRouter } from "vue-router";
import {
  userCommentAndReplyService,
  useraddCommentService,
  useraddReplyService,
} from "@/api/comment";
import avatar from "@/assets/default.png";
import { useLoginStore } from "@/store/login";
import dayjs from "dayjs";
import { watch } from 'vue'

const route = useRoute();
const props = defineProps({
  belongType: String,
});
const belongId = ref();
const commentData = ref();
const loginStore = useLoginStore();


//监控store里的用户id
watch(
  () => loginStore.userInfo.id, 
  (newId, oldId) => {
    if (newId !== oldId) {
     console.log(loginStore.userInfo.id)
     //重新获取以下评论区的页面
     getCommentAndReply();
    }
  },
  { immediate: true } // 设置immediate为true，表示在监听开始时立即执行一次
);


onMounted(() => {
  console.log(props.belongType);
  getCommentAndReply();
});
//获取整个评论区
async function getCommentAndReply() {
  belongId.value = route.query.id;
  try {
    const response = await userCommentAndReplyService(
      props.belongType,
      belongId.value,
      loginStore.userInfo.id
    );
    console.log(response);
    commentData.value = response.data;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

//所有的评论框，都是绑定这个
const textarea = ref("");
const replyBox=ref("")



//提交评论
async function commit() {
  //先做登录判断
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能评论",
      type: "warning",
    });
  } else {
    //不能提交空评论
    if (textarea.value == "") {
      ElMessage({
        message: "请输入评论",
        type: "warning",
      });
    } else {
      useraddCommentService(
        props.belongType,
        belongId.value,
        loginStore.userInfo.id,
        textarea.value
      );
      //刷新页面
      await getCommentAndReply();
      textarea.value=''
    }
  }
}

const secondReplyName = ref('123');

// 关闭其他评论框并且刷新要回复的对象的名字
function clickReply(item,replyName) {
  //关闭其他评论就是遍历
  for (const i of commentData.value) {
    if (i.comment.id != item.comment.id) 
    {
      i.Open=false
    }
  }
  item.Open=!item.Open
  secondReplyName.value=replyName
  console.log(secondReplyName.value)
}

//提交回复
async function reply(commentId) {
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能回复",
      type: "warning",
    });
  } else {
    //不能提交空评论
    if (replyBox.value == "") {
      ElMessage({
        message: "请输入回复",
        type: "warning",
      });
    } else {
      useraddReplyService(
        replyBox.value,
        loginStore.userInfo.id,
        commentId,
        secondReplyName.value
      );
      //刷新页面
      await getCommentAndReply();
      //提交完清空回复框
      replyBox.value=''
    }
  }
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

// function toggleComment(item) {
//
// }
</script>

<template>
  <el-row>
    <!-- 评论行 -->
    <el-card v-for="item in commentData" shadow="hover" style="width: 100%">
      <div class="replyHeader">
        <!-- 都先采用默认头像 -->
        <el-avatar class="mr-3" :size="32" :src="avatar" />

        <span class="text-large"> {{ item.user.nickName }} </span>
        <div class="flex-grow" />
        <!-- 点赞按钮 -->
        <!-- <el-button
          type="primary"
          text
          @click="toggleLike(item)"
          :icon="item.liked ? HeartFilled : Heart"
        >
        </el-button> -->
        <!-- 对评论的回复，传一个空回复名过去 -->
        <el-button
          type="primary"
          text
          @click="clickReply(item,null)"
          :icon="item.commentOpen ? CommentFilled : Comment"
        >
          回复评论
        </el-button>
      </div>
      <el-row class="mb-4">
        <el-col :span="1" />
        <el-col :span="23"> {{ item.comment.content }} </el-col>
      </el-row>
      <el-row class="mb-5">
        <el-col :span="21" />
        <span class="timestamp">{{ item.comment.date }}</span>
      </el-row>

      <div class="flex-grow" />

      <el-row>
        <el-col :span="1" />
        <el-col :span="22">

          <!-- 回复行 -->
          <el-card
            v-for="replyData in item.replyDTOList"
            shadow="hover"
            style="width: 100%"
          >
            <div class="subReplHeader">
              <el-avatar class="mr-2" :size="24" :src="avatar" />
              <span class="text-med"> {{ replyData.user.nickName }}</span>
              &nbsp;
              <span
                class="text-med"
                v-if="replyData.reply.secondReplyName != null"
                >回复 {{ replyData.reply.secondReplyName }}</span
              >
              <div class="flex-grow" />
              <!-- 点赞 -->
              <!-- <el-button
                type="primary"
                text
                @click="toggleLike(replyData)"
                :icon="false ? HeartFilled : Heart"
              >
                {{ replyData.commend }}
              </el-button> -->
              <!-- 对回复的回复 -->
              <el-button
                type="primary"
                text
                @click=clickReply(item,replyData.user.nickName)
                :icon="item.commentOpen ? CommentFilled : Comment"
              >
                回复
              </el-button>
            </div>
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="23">
                <el-text>
                  {{ replyData.reply.content }}
                </el-text>
              </el-col>
            </el-row>
            <el-row class="mb-5">
              <el-col :span="20" />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span class="timestamp">{{ replyData.reply.date }}</span>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 提交新回复框 -->
      <el-row v-show="item.Open">
        <el-col :span="1" />
        <el-col :span="22">
          <el-row class="mt-6">
            <el-input
              v-model="replyBox"
              :rows="1"
              type="textarea"
              placeholder="请输入你的回复..."
              resize="none"
              maxlength="256"
              show-word-limit
              autosize
            />
          </el-row>
          <el-row class="mt-4">
            <div class="flex-grow" />
            <el-button type="primary" @click="reply(item.comment.id)">提交</el-button>
          </el-row>
        </el-col>
        <el-col :span="1" />
      </el-row>
    </el-card>
  </el-row>



  <!-- 提交新评论框 -->
  <el-row class="mt-8">
    <el-input
      v-model="textarea"
      :rows="1"
      type="textarea"
      placeholder="请输入你的评论..."
      resize="none"
      maxlength="256"
      show-word-limit
      autosize
    />
  </el-row>
  <el-row class="mt-4">
    <div class="flex-grow" />
    <el-button type="primary" @click="commit">提交</el-button>
  </el-row>
</template>

<style scoped>
.el-card {
  border: 0;
  border-radius: 0.5rem;
  margin-bottom: 10px;
}

.el-card:last-child {
  margin-bottom: 0;
}

.text-large {
  font-weight: 600;
  font-size: 18px;
}

.replyHeader {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.subReplHeader {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.text-med {
  font-weight: 600;
  font-size: 14px;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

.flex-grow {
  flex-grow: 1;
}
.timestamp {
  font-size: 12px;
}
</style>
