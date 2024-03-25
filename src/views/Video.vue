<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { someVideos } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { userVideoListService } from "@/api/video";
import { useLoginStore } from "@/store/login.js";
import { ChatLineRound, View } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { genFileId } from "element-plus";
import type {
  MessageParamsWithType,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from "element-plus";

//默认的视频列表数据
const videos = ref();
const showUpload = ref(false);
//pinia
const loginStore = useLoginStore();
//判断是否打开上传弹窗
const handleUpload = () => {
  if (loginStore.isLoggedIn) {
    showUpload.value = true;
  } else {
    ElMessage({
      message: "登录后才能上传视频",
      type: "warning",
    });
  }
};

const router = useRouter();
const route = useRoute();

let page = 1;
let queryName = route.hash.substring(1);
let pageSize = 12;
const totalPage = ref(1);

onMounted(() => {
  getVideos("1", "12", null, null);
});

function handleClick(v: { video: { id: any } }) {
  // console.log(v);
  router.push(`/video-page?id=${v.video.id}`);
}

function handleCurrentChange(currentPage: any) {
  // // 获取点击的页码
  // console.log(currentPage);
  // page = currentPage;
  // getVideos();
}

// 获取默认视频列表
async function getVideos(
  page: string,
  pageSize: string,
  queryName: String,
  type: String
) {
  try {
    console.log("t");
    const response = await userVideoListService(
      page,
      pageSize,
      queryName,
      type
    );
    console.log(response.data);
    videos.value = response.data["records"];

    totalPage.value = response.data.total;
    console.log(totalPage.value);
  } catch (error) {
    console.log("请求失败！", error);
  }
}

function handleItemClick(type: String) {
  getVideos("1", "12", null, type);
}

//视频上传！！！
import { useraddVideoService } from "@/api/video";
//上传视频的对象
const upload = ref<UploadInstance>();

const videoFormRef = ref();

//处理上传文件数超过1的函数
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = async () => {
  await videoFormRef.value.validate();
  await upload.value.submit();
};

// 处理上传成功的函数
async function handleUploadSuccess(response: {
  code: number;
  msg: MessageParamsWithType;
  data: string;
}) {
  console.log("上传成功:", response);
  // 在这里处理上传成功后的逻辑，比如更新文件列表、提示用户等
  if (response.code == 400) ElMessage.error(response.msg);
  else {
    ElMessage.success(response.msg);
    videoForm.value.url = "http://localhost:8088/videos/" + response.data;
    videoForm.value.uploaderId = loginStore.userInfo.id;
    await useraddVideoService(
      videoForm.value.type,
      videoForm.value.uploaderId,
      videoForm.value.title,
      videoForm.value.url
    );
  }
  clearForm();
  console.log("clear!");
}
//处理上传失败的函数
async function handleUploadError(response: any) {
  console.log("上传失败", response);
  ElMessage.error("上传的文件大小超过限制或者服务器出错");
  clearForm();
  //获取新的视频数据
  getVideos("1", "12", null, null);
}

//上传视频表单的对象。这个主要用于表单验证。
const videFormRef = ref();
//上传视频的各个属性。这是传给后端的属性。
const videoForm = ref({
  type: "",
  uploaderId: "",
  title: "",
  url: "",
});
//上传视频表单的验证规则
const videoRules = reactive({
  type: [{ required: true, message: "视频类型不可为空！", trigger: "blur" }],
  title: [
    { required: true, message: "标题不可为空！", trigger: "blur" },
    { min: 1, max: 50, message: "标题的长度为 1-50位 的字符", trigger: "blur" },
  ],
});
// 清除上传表单内容和关闭表单
const clearForm = () => {
  upload.value!.clearFiles(); // 清除已选择的文件
  videoForm.value.type = "";

  // 更正这里的错误，应该是videoForm.value而非videoForm
  Object.keys(videoForm.value).forEach((key) => {
    videoForm.value[key] = "";
  });

  showUpload.value = false;
};
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
          <el-menu-item index="video" @click="handleItemClick(null)"
            >默认</el-menu-item
          >
          <el-menu-item
            index="video#commend"
            @click="handleItemClick('热门知识')"
            >热门知识</el-menu-item
          >
          <el-menu-item index="video#business" @click="handleItemClick('营业')"
            >营业</el-menu-item
          >
          <el-menu-item index="video#operation" @click="handleItemClick('装维')"
            >装维</el-menu-item
          >
          <el-menu-item
            index="video#manager"
            @click="handleItemClick('政企客户经理')"
            >政企客户经理</el-menu-item
          >
          <el-menu-item
            index="video#commissioner"
            @click="handleItemClick('客经专员')"
            >客经专员</el-menu-item
          >
          <el-menu-item
            index="video#director"
            @click="handleItemClick('支局长')"
            >支局长</el-menu-item
          >
          <el-menu-item
            index="video#distinct"
            @click="handleItemClick('片区长')"
            >片区长</el-menu-item
          >

          <el-menu-item
            index="video#distinct"
            @click="handleItemClick('VIP客户经理')"
            >VIP客户经理
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    
    <el-button
      type="primary"
      size="large"
      class="upload-button"
      @click="handleUpload"
    >
      上传视频<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
  </el-row>

  <!-- <el-row> 
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-space :size="20" wrap class="space">
        <el-card
          v-for="v in videos"
          :body-style="{ padding: '0px' }"
          shadow="hover"
          class="video-card"
        >

          <video controls style="width: 100%" preload="metadata" >
            <source :src="v.video.url" type="video/mp4"  />
            <p>
              Your browser doesn't support HTML5 video. Here is a
              <a href="{{ v.video.url }}">link to the video</a> instead.
              抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以使用下面的链接
              <a href="{{ v.video.url }}">下载</a>
              并用观看
            </p>
          </video>
          <div style="padding: 14px">
            <el-text size="large" tag="b" line-clamp="2" class="hover-effect" @click="handleClick(v)">
              {{ v.video.title }}
            </el-text>
            <el-row style="margin-top: 10px">
              <el-col :span="12"
                ><el-text>发布人：{{ v.user.nickName }}</el-text></el-col
              >
              <el-col :span="12"
                ><el-text>部门：{{ v.user.department }}</el-text></el-col
              >
            </el-row>
            <el-row style="margin-top: 8px">
              <div class="flex-grow" >
            </div>
              <time class="description">{{
                dayjs(v.video.date).format("YYYY-MM-DD HH:mm:ss")
              }}
              </time>
            </el-row>
          </div>
        </el-card>
      </el-space>
    </el-col>
  </el-row> -->

  <el-row>
    <el-col :span="2" />
    <el-col :span="20">
      <el-row class="cards" v-for="item in videos">
        <el-card class="box-card" shadow="hover" @click="handleClick(item)">
          <el-row>
            <el-text size="large" tag="b" line-clamp="1">
              {{ item.video.title }}
            </el-text>
          </el-row>
          <el-row style="margin-top: 10px; align-items: center">
            <el-col :span="6">
              <el-text>发布人： {{ item.user.nickName }}</el-text>
            </el-col>
            <el-col :span="6">
              <el-text>部门： {{ item.user.department }}</el-text>
            </el-col>
            <el-col :span="8">
              <el-text
                >发布时间：
                <time>{{
                  dayjs(item.video.date).format("YYYY-MM-DD")
                }}</time></el-text
              >
            </el-col>
            <el-col :span="4">
              <!--              <div class="flex-grid" /> 并不需要评论数--> 
              <!-- <el-text>
                <el-button text :icon="ChatLineRound">
                  {{ item.article.commentCount }} 1
                </el-button>
                
              </el-text> -->
              <el-text>
                <el-button text :icon="View">
                  <!-- {{ item.article.clickCount }} -->1
                </el-button>
                <!--                <View style="width: 1rem; height: 1em; margin-right: 4px" /> {{ item.commentVolume }}-->
              </el-text>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="2" />
  </el-row>

  <!-- 分页控件 -->
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
      :page-size="12"
      :total="totalPage"
      @current-change="handleCurrentChange"
      background
    />
  </el-row>

  <!-- 上传文件的登录弹窗表单 -->
  <el-dialog
    v-model="showUpload"
    width="30%"
    style="border-radius: 0.75rem"
    center
  >
    <el-form :model="videoForm" :rules="videoRules" ref="videoFormRef">
      <el-form-item>
        <el-text size="large" tag="b" type="primary">上传视频</el-text>
      </el-form-item>
      <el-form-item prop="title"
        ><el-input v-model="videoForm.title" placeholder="请输入上传的视频标题">
        </el-input
      ></el-form-item>
      <el-form-item prop="type">
        <el-select v-model="videoForm.type" placeholder="请选择上传的视频类型">
          <el-option lable="营业" value="营业"></el-option>
          <el-option lable="装维" value="装维"></el-option
          ><el-option lable="政企客户经理" value="政企客户经理"></el-option
          ><el-option lable="客经专员" value="客经专员"></el-option>
          <el-option lable="支局长" value="支局长"></el-option>
          <el-option lable="片区长" value="片区长"></el-option>
          <el-option lable="VIP客户经理" value="VIP客户经理"></el-option>
        </el-select>
      </el-form-item>
      <!--分别绑定上传超过限制、上传成功、上传失败的事件-->
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://localhost:8088/video/upload"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
      >
        <!-- 不写这个trigger，上传也会去选择文件 -->
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          上传
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            只能上传一个文件。新上传文件会覆盖旧文件。上传的视频文件最大为512MB仅允许MP4格式的文件。
          </div>
        </template>
      </el-upload>
    </el-form>
  </el-dialog>
</template>

<style scoped>
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

.file-upload {
  display: flex;
  gap: 1rem;
}

.select-file-btn,
.upload-btn {
  cursor: pointer;
}
.ml-3 {
  margin-left: 5%;
}
.el-text.hover-effect:hover {
  color: #409eff; /* 天蓝色 */
  cursor: pointer; /* 改变鼠标悬停时的样式为手型图标 */
}

.cards {
  margin-top: 15px;
}

.box-card {
  width: 100%;
  border-radius: 0.5rem;
}
.upload-button{
  position: absolute;
  right: 0px; /* 或者根据实际需求调整为合适的像素值 */
}
</style>
