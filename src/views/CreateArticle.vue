<script setup >
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { userQuestionAddService } from "@/api/question";
import { useLoginStore } from "@/store/login";
import { useRoute, useRouter } from "vue-router";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";




//菜单的配置
 const editorConfig = {                      
    MENU_CONF: {},
    placeholder: "请输入内容..." 

    
}

const router = useRouter();
const loginStore = useLoginStore();


const article = ref({
  title: "",
  contentHtml: "<p>hi</p>",
  type: "",
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
    article.value.contentHtml = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

const toolbarConfig = {};
//排除菜单的某些配置
toolbarConfig.excludeKeys = [

    'group-video' // 排除菜单组，写菜单组 key 的值即可
]


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleSubmit = () => {
    // 查看工具栏key
//     const editor = editorRef.value;
//   const toolbar = DomEditor.getToolbar(editor);
//   const curToolbarConfig = toolbar.getConfig();
//   console.log(curToolbarConfig.toolbarKeys);
console.log(article.value.contentHtml)
};


// 表单数据域名设置为image
editorConfig.MENU_CONF['uploadImage'] = {
    server: 'http://localhost:8088/article/upload-image',
    fieldName: 'image'
}


</script>
<template>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-form
        @submit.prevent="handleSubmit"
        label-width="80px"
        :model="question"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="类别" v-model="article.type">
          <el-select placeholder="请选择课件类别">
            <el-option lable="营业" value="营业"></el-option>
            <el-option lable="装维" value="装维"></el-option>
            <el-option lable="政企客户经理" value="政企客户经理"></el-option>
            <el-option lable="客经专员" value="客经专员"></el-option>
            <el-option lable="支局长" value="支局长"></el-option>
            <el-option lable="片区长" value="片区长"></el-option>
            <el-option lable="VIP客户经理" value="VIP客户经理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="narrow-input" label="课件标题" size="large">
          <el-input
            v-model="article.title"
            placeholder="请输入课件标题"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 2 }"
            maxlength="100"
            show-word-limit
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
          
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>

        <el-form-item> </el-form-item> </el-form
    ></el-col>
  </el-row>
</template>
