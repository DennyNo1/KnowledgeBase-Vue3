<script setup>
import { ref } from "vue";
const src = ref('https://pic1.zhimg.com/80/v2-b3c7761123adb4125d02c7661996301d_720w.webp')

const userInfo = ref({
  attention: 1000,
  quiz: 1000,
  answer: 1000
})

const activities = ref([
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
])
</script>

<template>
  <div class="parent-container">
    <div class="page">
      <el-row>
        <el-col :span="20">
          <el-image fit="fill" :src="src"></el-image>
        </el-col>
      </el-row>

      <div class="statistic">
        <el-row>
          <el-col :span="8">
            <el-statistic title="关注" :value="userInfo.attention" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="提问" :value="userInfo.answer" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="回答" :value="userInfo.quiz" />
          </el-col>
        </el-row>
      </div>
      <el-divider/>
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>

</template>

<style scoped>
.page {
  /* 居中显示 */
  margin: auto auto;
  padding: 10px; /* 添加内边距，使内容与边框有一定距离 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.statistic {
  margin-top: 30px;
}

.el-image {
  width: 20vw;
  height: 20vw;
  max-height: 240px;
  max-width: 240px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 0.7rem rgb(96 128 128 / 60%);
  user-select: none
}

.el-col {
   text-align: center;
}

.el-statistic {
  margin-left: 5px;
  margin-right: 5px;
}

.el-timeline {
  padding: 0;
  overflow: auto;
  width: 75%;
}

</style>