<script setup>
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";

import { useLoginStore } from "@/store/login";
import { useRoute, useRouter } from "vue-router";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {useraddArticleService,useraddAttachmentService,userUpdateArticleService,userDeleteAllAttachmentService} from "@/api/article"
import { onBeforeUnmount, ref, shallowRef, onMounted,watch,markRaw} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { userOneArticleService } from "@/api/article.js";

import request from "@/utils/request";

//菜单的配置
const editorConfig = {
  MENU_CONF: {},
  placeholder: "请输入内容...",
};

const router = useRouter();
const loginStore = useLoginStore();

const article = ref({
  title: "",
  contentHtml: "",
  type: "",
  uploadIder:"",
  top:"0"
});
const formRef = ref();
const route = useRoute();
onMounted(async () => {
  if(route.query.articleId){
    const response=await userOneArticleService(route.query.articleId)
    console.log(response)
    const articleEdit=response.data.articleListDTO.article;
    article.value.title=articleEdit.title;
    article.value.contentHtml=articleEdit.content
    article.value.top=articleEdit.top
    if(articleEdit.type.includes('*'))
    {
      isShare.value=true;
      articleEdit.type = articleEdit.type.substring(0, articleEdit.type.length - 1);
    }
    article.value.type= articleEdit.type;
    // 展示附件
    
    for (let i = 0; i < response.data.attachmentList.length; i++){

     fileList.value.push(markRaw(response.data.attachmentList[i]))
    }

  
  }
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML


// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
    
    
//   }, 15000);
// });

const toolbarConfig = {};

//排除菜单的视频选项
// toolbarConfig.excludeKeys = [
//   "group-video", // 排除菜单组，写菜单组 key 的值即可
// ];

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};




//最终的提交文章
const handleSubmit = async() => {
  // 查看工具栏key
  //     const editor = editorRef.value;
  //   const toolbar = DomEditor.getToolbar(editor);
  //   const curToolbarConfig = toolbar.getConfig();
  //   console.log(curToolbarConfig.toolbarKeys);

  //验证课件本身
  await formRef.value.validate();
  // console.log(article.value.contentHtml);
  
  //验证登录
  if (!loginStore.isLoggedIn) {
    ElMessage({
      message: "登录后才能进行该操作",
      type: "warning",
    });
    return;
  }
  //对共享给其他岗位，做一个特殊处理
  if(isShare)
  {
    article.value.type+='*';
  }

  article.value.uploaderId=loginStore.userInfo.id;
  // console.log(article.value.id)
  //将文章除附件外持久化。后端还会返回持久化的文章实体的id。
  const response=await useraddArticleService(article.value.uploaderId,article.value.type,article.value.title,article.value.contentHtml,article.value.top);
  console.log(response)
  //在后端，data已经被设置成aritle的id
  const articleId=response.data;
  //将附件持久化
  for (let i = 0; i < fileList.value.length; i++){
    //因为一次只传一个文件
    const attachment=fileList.value[i]
    //因为用的是图片的附件接口，所以还是这样获取url
    await useraddAttachmentService(articleId,attachment.response[0].data.url,attachment.name,attachment.uid)
  }
  goBack()

  
  
};





function goBack() {
  router.back();
}

// 表单数据域名设置为image
editorConfig.MENU_CONF["uploadImage"] = {
  server: "http://localhost:8088/article/upload-image",
  fieldName: "image",
};


editorConfig.MENU_CONF['uploadVideo'] = {
     server: "http://localhost:8088/article/upload-video",
     fieldName: "video",
}
//整个上传模块的附件数据。这个里面已经保存着每次的response消息。
const fileList = ref([
])

function handleExceed(){
  ElMessage({
      message: "最多只能上传5个文件",
      type: "warning",
    });
}
//上传一个文件，就持久化一条记录。这个设计思想不想，因为此时文章还没创建，没有articleId，还是得创建文章后，把所有附件对象一起传过去。


//通过uid遍历删除想要删除的上传文件
function handleUploadRemove(uploadFile){
  console.log(uploadFile)
  for (let i = 0; i < fileList.value.length; i++) {
    
  if (fileList.value[i].uid === uploadFile.uid) {
    fileList.value.splice(i, 1);
    break;
  }
}
    
}
const rules = {
  title: [{ required: true, message: "课件的标题不可为空", trigger: "blur" }],

  type: [{ required: true, message: "课件的类型不可为空", trigger: "blur" }],
};

const isShare=ref(false)
// 使用 watch 监听 isShare 变化
watch(
  () => isShare.value, // 需要监听的值，这里返回 ref 的 value
  (newValue) => {
    console.log('isShare 已更新为：', newValue);
    console.log(article.value.type)
  },
  { immediate: true } // 可选参数，如果设为 true，则在 watch 一开始就会触发回调一次
);
watch(
  ()=>fileList.value,
  (newValue)=>{
console.log(fileList.value)
  },{ immediate: true }
)


//修改
async function handleUpdate(){
    //验证课件本身
    await formRef.value.validate();



      //对共享给其他岗位，做一个特殊处理
  if(isShare)
  {
    article.value.type+='*';
  }


  await userUpdateArticleService(route.query.articleId,loginStore.userInfo.id,article.value.type,article.value.title,article.value.contentHtml,article.value.top);
  await userDeleteAllAttachmentService(route.query.articleId)
  const articleId=route.query.articleId
    //将附件持久化
    for (let i = 0; i < fileList.value.length; i++){
    //因为一次只传一个文件
    const attachment=fileList.value[i]
    //代表原有来的附件
    if(attachment.articleId)
    {
      await useraddAttachmentService(attachment.articleId,attachment.url,attachment.name,attachment.uid)
    }
    //新上传的附件
    else{
      
      await useraddAttachmentService(articleId,attachment.response[0].data.url,attachment.name,attachment.uid)
  }
  
  }goBack()



  
}
</script>
<template>

  <el-row>

    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-form
        @submit.prevent="handleSubmit"
        label-width="80px"
        :model="article"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item  label="面向岗位"   prop="type" >
          <el-select placeholder="请选择课件面向岗位" v-model="article.type" style="width: 86rem;" >
            <el-option lable="营业" value="营业" key="1"></el-option>
            <el-option lable="装维" value="装维" key="2"></el-option>
            <el-option lable="政企客户经理" value="政企客户经理"></el-option>
            <el-option lable="客经专员" value="客经专员"></el-option>
            <el-option lable="支局长" value="支局长"></el-option>
            <el-option lable="片区长" value="片区长"></el-option>
            <el-option lable="VIP客户经理" value="VIP客户经理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="narrow-input" label="课件标题" size="large"  prop="title" >
          <el-input
            v-model="article.title"
            placeholder="请输入课件标题"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 2 }"
            maxlength="100"
            show-word-limit
            style="width: 86rem;"
            
          ></el-input>
        </el-form-item>

        <el-form-item class="narrow-input" label="课件内容" size="large">
          <div style="border: 1px solid #ccc">
            <!-- 工具栏 -->
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <!-- 编辑框 -->
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="article.contentHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>

        <el-form-item label="上传附件" size="large">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action=http://localhost:8088/article/upload-attachment
            :limit="5"
            :on-exceed="handleExceed"
            :on-remove="handleUploadRemove"
            :on-success="handleAfterUpload"
            
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                最多上传5个文件。每个文件大小不超过512MB。
              </div>
            </template>
          </el-upload>
        </el-form-item>
      <el-form-item>

        <el-text>
              置顶度(0-100)：<el-input-number
                v-model="article.top"
                
                min="0"
                max="100"
              />
            </el-text>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isShare" label="共享给其他岗位" size="large"  />
      </el-form-item>

        <el-form-item>
          
          <el-button type="primary" @click="handleUpdate" size="large" v-if="route.query.articleId">修改</el-button>
          <el-button type="primary" @click="handleSubmit" size="large" v-else>提交</el-button>
          
          <el-button
         
         @click="goBack"
         size="large"
         
         >返回</el-button
       >
          
        </el-form-item>
        

        </el-form>
      </el-col>
  </el-row>
</template>
<style></style>
