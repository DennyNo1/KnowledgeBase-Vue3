<script setup>

import { ref } from "vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import Heart from "@/components/icons/Heart.vue";
import CommentFilled from "@/components/icons/CommentFilled.vue";
import Comment from "@/components/icons/Comment.vue";

const props = defineProps(['commentSrc'])
const textarea = ref('')

const commentData = ref([
  {
    user: '用户1',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    content: '这是一条消息',
    commend: 0,
    isLiked: false,
    commentOpen: false,
    repl: [
      {
        user: '用户3',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: '这是另外一条消息',
        commend: 0,
        isLiked: false,
        commentOpen: false
      },
      {
        user: '用户4',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: '这是另外一条消息',
        commend: 0,
        isLiked: false,
        commentOpen: false
      },
      {
        user: '用户5',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: '这是另外一条消息',
        commend: 0,
        isLiked: false,
        commentOpen: false
      }
    ]
  },
  {
    user: '用户1',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    content: '这是一条消息',
    commend: 0,
    isLiked: false,
    commentOpen: false,
    repl: [
      {
        user: '用户3',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: '这是另外一条消息',
        commend: 0,
        isLiked: false,
        commentOpen: false
      },
      {
        user: '用户4',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: '这是另外一条消息',
        commend: 0,
        isLiked: false,
        commentOpen: false
      },
      {
        user: '用户5',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: '这是另外一条消息',
        commend: 0,
        isLiked: false,
        commentOpen: false
      }
    ]
  }
])

function commit() {
  console.log('提交')
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
    <el-card v-for="item in commentData" shadow="hover" style="width: 100%">
      <div class="replyHeader">
        <el-avatar
            class="mr-3"
            :size="32"
            :src="item.avatar"
        />
        <span class="text-large"> {{ item.user }} </span>
        <div class="flex-grow"/>
        <el-button
            type="primary"
            text @click="toggleLike(item)"
            :icon="item.isLiked ? HeartFilled : Heart"
        >
          {{ item.commend }}
        </el-button>
        <el-button
            type="primary"
            text
            @click="item.commentOpen = !item.commentOpen"
            :icon="item.commentOpen ? CommentFilled : Comment"
        >
          {{ item.repl.length }}
        </el-button>
      </div>
      <el-row class="mb-4">
        <el-col :span="1" />
        <el-col :span="23"> {{ item.content }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="1" />
        <el-col :span="23">
          <el-card v-for="it in item.repl" shadow="hover" style="width: 100%;">
            <div class="subReplHeader">
              <el-avatar
                  class="mr-2"
                  :size="24"
                  :src="it.avatar"
              />
              <span class="text-med"> {{ 1111 }} </span>
              <div class="flex-grow"/>
              <el-button
                  type="primary"
                  text @click="toggleLike(it)"
                  :icon="it.isLiked ? HeartFilled : Heart"
              >
                {{ it.commend }}
              </el-button>
            </div>
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="23">
                <el-text>
                  {{ it.content }}
                </el-text>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-show="item.commentOpen">
        <el-col :span="2" />
        <el-col :span="21" >
          <el-row class="mt-6">
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
            <div class="flex-grow"/>
            <el-button type="primary" @click="commit">提交</el-button>
          </el-row>
        </el-col>
        <el-col :span="1" />
      </el-row>

    </el-card>
  </el-row>
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
    <div class="flex-grow"/>
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
</style>