<script setup>
import chatAvatar from "@/assets/chat.png";
import { watch, ref, onMounted, onUnmounted } from "vue";
import {
  userCreateConversation,
  userSendMessage,
  userDissatisfiedAnswerService,
} from "@/api/ragflow.js";
import { Edit, View as IconView, Document } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
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
async function sendMessage(questionObject) {
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

// 问题和回复的数组，每个对象包含问题和数组,用于页面展示
const questionReplyArray = ref([]);

//处理发送
async function send() {
  // {"role": "user", "content": "How are you doing!"}这是提问者的问题格式
  const questionObject = {
    role: "user",
    content: inputText.value,
  };
  // 这是展示在页面上的数据对象
  const oneQuestionReply = ref({
    text: inputText.value,
  });

  //先在数组中插入这个对象，以跳出提问框
  questionReplyArray.value.push(oneQuestionReply.value);
  inputText.value = ""; // 清空输入框
  const response = await sendMessage(questionObject);
  //response.data是字符串，必须解析成JSON才能使用

  // console.log(parseDataString(response.data))

  // 包含所有回复的一个数组

  const replyArray = parseDataString(response.data);
  //获取倒数第二个元素作为最终答案,即已经处理过的回复
  const finalReply = replyArray[replyArray.length - 2];

  oneQuestionReply.value.reply = finalReply;
  // 让不满意的按钮只能点一次
  oneQuestionReply.value.enable=true

  //拿到回复后，再补上覆盖原问题和回答
  questionReplyArray.value[questionReplyArray.length - 1] =
    oneQuestionReply.value;

  //把处理过的回复数据，插入到后端所需要的messageArray
  const replyObject = {
    content: finalReply.data.answer,
    reference: finalReply.data.reference,
    role: "assistant",
  };
  messageArray.value.push(replyObject);
}

//处理字符串的函数
function parseDataString(dataString) {
  // 分割字符串，得到所有以 "data:" 开头的部分
  const parts = dataString.split(/data:/g).slice(1); // slice(1) 是为了去掉第一个空元素

  // 创建一个空数组来保存解析后的JSON对象
  const jsonArray = [];

  // 遍历每一部分
  parts.forEach((part) => {
    try {
      // 解析每一部分为JSON对象
      const jsonData = JSON.parse(part.trim());
      // 添加到数组中
      jsonArray.push(jsonData);
    } catch (error) {
      // 如果解析失败，可以记录错误或忽略该部分
      console.error(`Error parsing JSON: ${part}`, error);
    }
  });

  return jsonArray;
}

const downloadDocument = (doc_id, doc_name) => {
  // 使用Fetch API发起请求到后端API
  fetch(`http://172.27.20.24/v1/document/get/${doc_id}`)
    .then((response) => {
      // 检查响应状态，如果响应成功则继续处理
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // 将响应体转换为Blob对象
      return response.blob();
    })
    .then((blob) => {
      // 创建一个隐藏的`<a>`标签来触发文件下载
      const downloadLink = document.createElement("a");
      // 创建一个指向Blob对象的URL
      const url = window.URL.createObjectURL(blob);
      // 设置`<a>`标签的`href`属性为Blob URL
      downloadLink.href = url;
      // 设置`download`属性为所需的文件名
      downloadLink.download = doc_name;
      // 隐藏`<a>`标签
      downloadLink.style.display = "none";
      // 将`<a>`标签添加到DOM中
      document.body.appendChild(downloadLink);
      // 触发点击事件以下载文件
      downloadLink.click();
      // 从DOM中移除`<a>`标签
      document.body.removeChild(downloadLink);
      // 释放Blob URL的引用
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      // 如果发生错误，则记录错误信息
      console.error("Failed to download:", error);
    });
};
//触发不满意
// q代表元素，包含问题和回答
async function Dissatisfied(question, answer, reference,q) {
  ElMessage({
    message: "已收到您的反馈，我们会尽快处理",
    type: "warning",
  });
  // reference是一个json对象，要转换成string再传输
  const referenceString = JSON.stringify(reference);
  q.enable=false
  console.log(q.enable)
  await userDissatisfiedAnswerService(question, answer, referenceString);
  

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
        <!-- 问题 -->
        <el-row :style="{ width: '100%', fontSize: '1.2em' }">
          <el-col :span="23" />&nbsp&nbsp&nbsp
          <el-avatar :size="large" class="avatar">我</el-avatar>
          <el-card style="width: 100%; text-align: right">
            <div class="text-wrapper">{{ question.text }}</div>
          </el-card>
        </el-row>
        <!-- 回答 -->
        <el-row :style="{ width: '100%', fontSize: '1.2em' }">
          <el-avatar :size="large" :src="chatAvatar" class="avatar"></el-avatar>
          <el-card
            style="width: 100%"
            v-if="!question.reply"
            v-loading="!question.reply"
            >搜索中...</el-card
          >
          <el-card style="width: 100%" v-else>
            <!-- <div v-html="question.reply.data.answer"></div> -->
            <div>
              <p class="preserve-whitespace">
                {{ question.reply.data.answer }}
              </p>
              <div
                v-for="(doc_aggs, index) in question.reply.data.reference
                  .doc_aggs"
                :key="index"
              >
                <el-link
                  @click="downloadDocument(doc_aggs.doc_id, doc_aggs.doc_name)"
                  type="primary"
                  :icon="Document"
                  class="custom-size"
                  >{{ doc_aggs.doc_name }}</el-link
                >
              </div>
              <p>
                <el-button
                  :disabled="!question.enable"
                  @click="
                    Dissatisfied(
                      question.text,
                      question.reply.data.answer,
                      question.reply.data.reference,
                      question
                    )
                  "
                  plain
                  >我不满意这个回答</el-button
                >
              </p>
            </div>
          </el-card>
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
          maxlength="800"
          @keyup.enter="send"
        />
      </el-row>
      <el-row class="commit-button">
        <el-col :span="23" />
        <el-button type="primary" @click="send" 
          >发送</el-button
        >
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
.preserve-whitespace {
  white-space: pre-wrap; /* 保留空格和换行符 */
}
.custom-size {
  font-size: 1.2em; /* 调整字体大小 */
}
.custom-size .el-icon-document {
  font-size: 1.2em; /* 调整图标大小 */
}
.text-wrapper {
  white-space: pre-wrap; /* 保持空格和换行符，同时允许文本换行 */
  word-break: break-word; /* 如果一行无法显示所有内容，则会在单词之间换行 */
}
</style>
