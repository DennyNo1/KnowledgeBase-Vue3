<script setup lang="ts">
import { onMounted, ref,reactive } from "vue";
import { someVideos } from "@/api/knowledgeBase.js";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { userVideoListService } from "@/api/video";
import { useLoginStore } from "@/store/login.js";

import { ElMessage } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const videos = ref(); //默认的视频列表数据
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

// 获取默认视频列表
async function getVideos(page, pageSize, queryName, type) {
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

function handleItemClick(index) {
  if (index !== queryName) {
    queryName = index;
    getVideos();
  }
}

//上传视频的对象
const upload = ref<UploadInstance>();

//处理上传文件数超过1的函数
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = async () => {
  await upload.value.submit();
};

// 处理上传成功的函数
async function handleUploadSuccess(response) {
  console.log("上传成功:", response);
  // 在这里处理上传成功后的逻辑，比如更新文件列表、提示用户等
  if (response.code == 400) ElMessage.error(response.msg);
  else {
    ElMessage.success(response.msg);
    showUpload.value=false
  }
}
//处理上传失败的函数
async function handleUploadError(response) {
  console.log("上传失败", response);
  ElMessage.error('上传的文件大小超过限制或者服务器出错');
}

//上传视频表单的对象。这个主要用于表单验证。
const videFormRef = ref();
//上传视频的各个属性。这是传给后端的属性。
const videoForm=ref(
  {
    type:"",
    uploaderId:"",
    title:"",
    url:"",

  }
)
//上传视频表单的验证规则
const videoRules = reactive({
  type: [
    { required: true, message: "视频类型不可为空！", trigger: "blur" },
    
  ],
  title: [
    { required: true, message: "标题不可为空！", trigger: "blur" },
    { min: 1, max: 50, message: "标题的长度为 1-50位 的字符", trigger: "blur" },

  ],

});

</script>

<template>
  <el-row>
    <el-col :span="2" />
    <el-col :span="19">
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
            >VIP客户经理
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="1" />
    <el-button
      type="primary"
      size="large"
      class="upload-button"
      @click="handleUpload"
    >
      上传视频<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
  </el-row>

  <el-row>
    <el-col :span="2" />
    <el-space :size="20" wrap class="space">
      <el-card
        v-for="v in videos"
        :body-style="{ padding: '0px' }"
        shadow="hover"
        class="video-card"
        @click="handleClick(v)"
      >
        <!-- 获取单个视频 -->
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
    <!-- 分页控件 -->
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
    <el-form
    :model="videoForm"
    :rules="videoRules"
    ref="videoFormRef">
      <el-form-item prop="title"
        ><el-input v-model="videoForm.title" placeholder="请输入上传的视频标题"> </el-input
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
      <!--绑定如果上传成功的事件-->
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
        
          <el-button type="primary">选择文件</el-button>
        
        <el-button class="ml-3" type="success" @click="submitUpload">
          上传到服务器
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            只能上传一个文件。新上传文件会覆盖旧文件。上传的视频文件最大为512MB。
          </div>
        </template>
      </el-upload>


      
    </el-form>
  </el-dialog>
</template>

<style scoped>
.space {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -20px;
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

.file-upload {
  display: flex;
  gap: 1rem;
}

.select-file-btn,
.upload-btn {
  cursor: pointer;
}
</style>
