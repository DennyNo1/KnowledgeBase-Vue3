<script setup>
import chatAvatar from "@/assets/chat.png";
import { watch, ref, onMounted, onUnmounted } from "vue";
import { userCreateConversation, userSendMessage } from "@/api/ragflow.js";

// 提问输入框
const inputText = ref("");

// 原始文本
const initialText = ref();
// 当前显示的文本
const displayedText = ref("");

// 字符显示速度 (毫秒)
const typingSpeed = 100;
// 定时器变量
let timer;
const conversationId = ref();

// 存储所有消息的数组。第一个对象是有关初始回答的，第二个是有关问题，第三个有关回答。以此类推。
const messageArray = ref();
// 初始化时开始动画
onMounted(async () => {
  // startTyping();
  await createConversation();
});

//创建新对话
async function createConversation() {
  try {
    const response = await userCreateConversation();
    // console.log(response);
    //把这次对话的id用一个变量保存
    conversationId.value = response.data.data.id;
    messageArray.value = response.data.data.message;
    // console.log(response.data.data.message[0].content)
    initialText.value = response.data.data.message[0].content;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

//发送消息
async function sendMessage( questionObject) {
  try {
    messageArray.value.push(questionObject);
    return await userSendMessage(conversationId.value, messageArray.value);
  } catch (error) {
    console.log("请求失败！", error);
  }
}

// function startTyping() {
//   let index = 0;
//   timer = setInterval(() => {
//     if (index < initialText.length) {
//       displayedText.value += initialText[index];
//       index++;
//     } else {
//       clearInterval(timer);
//     }
//   }, typingSpeed);
// }

// // 清理定时器
// onUnmounted(() => {
//   clearInterval(timer);
// });

// 问题和回复的数组，每个对象包含问题和数组
const questionReplyArray = ref([]);
async function send() {
  // {"role": "user", "content": "How are you doing!"}这是问题的格式
  const questionObject = {
    role: "user",
    content: inputText.value,
  };
  const response=await sendMessage(questionObject)
  console.log(response.data)
  const newQuestion = {
    text: inputText.value,
    answer: "", // 您可以根据需要设置答案
  };

  questionReplyArray.value.push(newQuestion);
  inputText.value = ""; // 清空输入框
}
</script>
<template>
  <!-- 对话展示框 -->
  <el-row>
    <el-col :span="3" />
    <el-col :span="19">
      <!-- 首次进入时的默认提示词 -->
      <div>
        <el-row :style="{ width: '100%', fontSize: '1.2em' }">
          <el-avatar :size="large" :src="chatAvatar" class="avatar"></el-avatar>
          <el-card style="width: 100%">{{ initialText }}</el-card>
        </el-row>
      </div>
      <!-- 一个问答，包含用户一次提问和ai的一次回答 -->
      <div
        style="margin-top: 3rem"
        v-for="(question, index) in questionReplyArray"
        :key="index"
      >
        <el-row :style="{ width: '100%', fontSize: '1.2em' }">
          <el-col :span="23" />&nbsp&nbsp&nbsp
          <el-avatar :size="large" class="avatar">我</el-avatar>
          <el-card style="width: 100%; text-align: right">{{
            question.text
          }}</el-card>
        </el-row>
        <el-row :style="{ width: '100%', fontSize: '1.2em' }">
          <el-avatar :size="large" :src="chatAvatar" class="avatar"></el-avatar>
          <el-card style="width: 100%">这是我的回答</el-card>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <!-- 提问框 -->
  <el-row class="bottom-sticky">
    <el-col :span="3" />
    <el-col :span="19">
      <el-row>
        <el-input
          v-model="inputText"
          type="textarea"
          placeholder="请输入您的问题..."
          :style="{ width: '100%', height: '100%', fontSize: '1.2em' }"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </el-row>
      <el-row class="commit-button">
        <el-col :span="23" />
        <el-button type="primary" @click="send">发送</el-button>
      </el-row>
    </el-col>
    <el-col :span="2" />
  </el-row>
</template>
<style scoped>
.bottom-sticky {
  margin-top: 10rem;
  margin-bottom: 1rem;
}
.commit-button {
  margin-top: 1rem;
}
.avatar {
  margin-bottom: 0.5rem;
}
</style>
