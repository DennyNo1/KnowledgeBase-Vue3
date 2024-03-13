<script setup>
import { onMounted, ref } from "vue";
import { someVideos } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";

const videos = ref([
  {
    video: {
      id: 1,
      type: "营业",
      uploaderId: 1,
      date: "2024-01-17T09:40:09",
      clickCount: "6",
      title:
        "云上之翼 | 中化信息联合天翼云共同打造化工行业云平台，赋能数字化转型升级",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张昊天",
    department: "云中台",
  },
  {
    video: {
      id: 2,
      type: "装维",
      uploaderId: 2,
      date: "2024-01-25T15:18:45",
      clickCount: "1",
      title:
        "云上之翼 | 走进知学云，与新华网一同见证天翼云赋能人才培养数智化转型",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "李松泽",
    department: "软研中心",
  },
  {
    video: {
      id: 3,
      type: "客户经理",
      uploaderId: 3,
      date: "2024-01-25T15:25:46",
      clickCount: "2",
      title:
        "“硬核”战风雪，我们一直在行动！中国电信应急保障团队抵抗严寒除冰，修复受损光缆，守护信号",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张睿阳",
    department: "软研中心",
  },
  {
    video: {
      id: 4,
      type: "客经专员",
      uploaderId: 1,
      date: "2024-01-25T15:26:55",
      clickCount: "3",
      title:
        "抢险救灾央企行动 | 湖南多地出现暴雪，中国电信迅速启动应急预案保障通信",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张昊天",
    department: "云中台",
  },
  {
    video: {
      id: 5,
      type: "支局长",
      uploaderId: 2,
      date: "2024-01-25T15:27:43",
      clickCount: "4",
      title:
        "新疆乌什县突发7.1级地震，中国电信连夜出动应急通信保障人员及物资有序恢复当地网络通信",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "李松泽",
    department: "软研中心",
  },
  {
    video: {
      id: 6,
      type: "片区长",
      uploaderId: 3,
      date: "2024-01-25T15:28:37",
      clickCount: "5",
      title: "全国首创5G+无人机血液运输智能空港平台，电信5G网络全覆盖航路",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张睿阳",
    department: "软研中心",
  },
  {
    video: {
      id: 7,
      type: "营业",
      uploaderId: 1,
      date: "2024-01-25T15:29:26",
      clickCount: "1",
      title:
        "数智服务暖民心，全员服务在行动！挥洒汗水与热爱，扎根网格坚定守护，是服务者更是守护者",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张昊天",
    department: "云中台",
  },
  {
    video: {
      id: 8,
      type: "装维",
      uploaderId: 2,
      date: "2024-01-25T15:30:38",
      clickCount: "2",
      title:
        "揭秘手机直连卫星背后的故事！中国电信手机直连卫星业务，天地一体，时刻守护",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "李松泽",
    department: "软研中心",
  },
  {
    video: {
      id: 9,
      type: "客户经理",
      uploaderId: 3,
      date: "2024-01-25T15:31:31",
      clickCount: "1",
      title: "时光交替，四季流转，大寒不寒，人间安暖",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张睿阳",
    department: "软研中心",
  },
  {
    video: {
      id: 10,
      type: "客经专员",
      uploaderId: 1,
      date: "2024-01-25T15:32:39",
      clickCount: "5",
      title:
        "大寒迎年，寒冬将过，小翼愿您依旧热爱生活，继续兴致盎然的与世界交手",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张昊天",
    department: "云中台",
  },
  {
    video: {
      id: 11,
      type: "支局长",
      uploaderId: 2,
      date: "2024-01-25T15:33:30",
      clickCount: "6",
      title:
        "央视聚集：中国电信联合打造深圳首个“5G+无人机血液运输智能空港平台”",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "李松泽",
    department: "软研中心",
  },
  {
    video: {
      id: 12,
      type: "片区长",
      uploaderId: 3,
      date: "2024-01-25T15:34:29",
      clickCount: "3",
      title: "翼周播报 ·第18期 | 浓情腊八节“粥”到服务暖人心",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    nickName: "张睿阳",
    department: "软研中心",
  },
]);

const router = useRouter();
const route = useRoute();

let page = 1;
let queryName = route.hash.substring(1);
let pageSize = 12;
const totalPage = ref(10);

// onMounted( () => {
//   getVideos()
// })

function handleClick(v) {
  // console.log(v);
  router.push(`/video-page?id=${v.video.id}`);
}

function handleCurrentChange(currentPage) {
  // 获取点击的页码
  console.log(currentPage);
  page = currentPage;
  getVideos();
}

async function getVideos() {
  try {
    const response = await someVideos(page, pageSize, queryName);
    // console.log(response.data);
    videos.value = response.data["records"];
    totalPage.value = response.data.total;
  } catch (error) {
    console.log("请求失败！", error);
  }
}

function handleItemClick(index) {
  if (index !== queryName) {
    queryName = index;
    getVideos();
  }
}

// const currentPage = ref(route.query.page === null ? 1 : parseInt(route.query.page))
// console.log(route.query.page);
// console.log(currentPage.value);
// console.log(route.query.page ? route.query.page.toNumber() : 1);

// console.log(route.query.id); // 123
// console.log(route.query.name); // John Doe
// console.log(currentPage.value);
</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-card shadow="always" class="top" :body-style="{ padding: '0' }">
        <el-menu
          :default-active="`video${route.hash}`"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="video" @click="handleItemClick('')"
            >默认</el-menu-item
          >
          <el-menu-item
            index="video#commend"
            @click="handleItemClick('commend')"
            >热门知识</el-menu-item
          >
          <el-menu-item
            index="video#business"
            @click="handleItemClick('business')"
            >营业</el-menu-item
          >
          <el-menu-item
            index="video#operation"
            @click="handleItemClick('operation')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="video#manager"
            @click="handleItemClick('manager')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item
            index="video#commissioner"
            @click="handleItemClick('commissioner')"
            >客经专员</el-menu-item
          >
          <el-menu-item
            index="video#director"
            @click="handleItemClick('director')"
            >支局长</el-menu-item
          >
          <el-menu-item
            index="video#distinct"
            @click="handleItemClick('distinct')"
            >片区长</el-menu-item
          >
          <el-menu-item
            index="video#distinct"
            @click="handleItemClick('vipManger')"
            >VIP客户经理</el-menu-item
          >
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="2" />
  </el-row>
  <el-row>
    <el-space :size="20" wrap class="space">
      <el-card
        v-for="v in videos"
        :body-style="{ padding: '0px' }"
        shadow="hover"
        class="video-card"
        @click="handleClick(v)"
      >
        <!--        封面视频-->
        <video controls style="width: 100%" preload="metadata">
          <source :src="v.video.url" type="video/mp4" class="" />
          <p>
            Your browser doesn't support HTML5 video. Here is a
            <a href="{{ v.video.url }}">link to the video</a> instead.
            抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以使用下面的链接
            <a href="{{ v.video.url }}">下载</a>
            并用观看
          </p>
        </video>
        <div style="padding: 14px">
          <el-text size="large" tag="b" line-clamp="2">
            {{ v.video.title }}
          </el-text>
          <el-row style="margin-top: 10px">
            <el-col :span="12"
              ><el-text>发布人：{{ v.nickName }}</el-text></el-col
            >
            <el-col :span="12"
              ><el-text>部门：{{ v.department }}</el-text></el-col
            >
          </el-row>
          <el-row style="margin-top: 8px">
            <div class="flex-grow" />
            <time class="description">{{
              dayjs(v.video.date).format("YYYY-MM-DD HH:mm:ss")
            }}</time>
          </el-row>
        </div>
      </el-card>
    </el-space>
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
      layout="prev, pager, next"
      :page-count="totalPage"
      @current-change="handleCurrentChange"
      background
    />
  </el-row>
</template>

<style scoped>
.space {
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-right: -20px;
}

.video-card {
  width: 300px;
  border-radius: 0.5rem;
}

.description {
  font-size: 12px;
  color: #999;
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
