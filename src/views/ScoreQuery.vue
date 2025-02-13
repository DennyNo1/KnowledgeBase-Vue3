<script setup>
import { reactive, ref } from "vue";
import { Iphone } from "@element-plus/icons-vue";
import { fetchScoreList } from "@/api/score";

// 表单数据
const scoreForm = ref({
  bil_month: "",
  sales_phone_number: "",
});
const scoreFormRef = ref();
const dataList = ref();
// 表单校验规则
const scoreRules = reactive({
  sales_phone_number: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
  bil_month: [{ required: true, message: "请选择账期", trigger: "change" }],
});

// 查询按钮点击事件
const handleQuery = async () => {
  await scoreFormRef.value.validate();
  //日期格式化
  scoreForm.value.bil_month = dateFormat(scoreForm.value.bil_month);
  //   console.log("查询表单数据：", scoreForm.value.bil_month);
  await fetchScoreList(
    scoreForm.value.bil_month,
    scoreForm.value.sales_phone_number,
    "1",
    "1000"
  ).then((res) => {
    dataList.value = res.data.data.data;
  });
};

// 原始日期字符串
const dateFormat = (dateString) => {
  // 将日期字符串转换为 Date 对象
  const date = new Date(dateString);

  // 提取年份和月份
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份并加 1

  // 格式化月份为两位数（例如：2 -> 02）
  const formattedMonth = String(month).padStart(2, "0");

  // 拼接成目标格式 "YYYYMM"
  const result = `${year}${formattedMonth}`;
  return result;
};
</script>

<template>
  <div class="query-container">
    <!-- 左侧查询表单 -->
    <div class="query-form">
      <el-form
        class="form"
        ref="scoreFormRef"
        :model="scoreForm"
        :rules="scoreRules"
        size="large"
        autocomplete="off"
      >
        <h3 class="table-title" style="margin-bottom: 3rem">积分查询</h3>
        <!-- 手机号输入框 -->
        <el-form-item prop="sales_phone_number" label="手机">
          <el-input
            :prefix-icon="Iphone"
            v-model="scoreForm.sales_phone_number"
            placeholder="请输入你的手机号"
          ></el-input>
        </el-form-item>
        <!-- 账期选择器 -->
        <el-form-item prop="bil_month" label="账期">
          <el-date-picker
            v-model="scoreForm.bil_month"
            type="month"
            placeholder="请选择你要查询的账期"
            style="width: 100%"
          />
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            @click="handleQuery"
            style="width: 100%"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 右侧查询结果 -->
    <div class="result-table">
      <h3 class="table-title">查询结果</h3>
      <el-table :data="[]" style="width: 100%">
        <el-table-column prop="date" label="月份"></el-table-column>
        <el-table-column prop="name" label="资产业务号码"></el-table-column>
        <el-table-column prop="address" label="积分类型"></el-table-column>
        <el-table-column prop="address" label="积分"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.query-container {
  display: grid;
  grid-template-columns: 2fr 5fr; /* 左右布局，左侧占 1/3，右侧占 2/3 */
  gap: 1rem; /* 左右两部分之间的间距 */
  height: 100%; /* 确保容器高度占满父容器 */
}

/* 左侧查询表单样式 */
.query-form {
  border: 1px solid #dcdcdc; /* 边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #fff; /* 背景颜色 */
  padding: 1.5rem; /* 内边距 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 阴影效果 */
  display: flex;
  flex-direction: column; /* 垂直排列 */
  justify-content: space-between; /* 内容均匀分布 */
  margin-left: 2rem;
  margin-top: 2rem;
}

.form-title {
  font-size: 18px; /* 标题字体大小 */
  font-weight: bold; /* 加粗 */
  margin-bottom: 1rem; /* 标题与表单之间的间距 */
  text-align: center; /* 居中对齐 */
}

.form {
  width: 100%; /* 表单宽度占满父容器 */
}

.el-form-item {
  margin-bottom: 2rem; /* 表单项之间的间距 */
}

/* 右侧查询结果样式 */
.result-table {
  border: 1px solid #dcdcdc; /* 边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #fff; /* 背景颜色 */
  padding: 1.5rem; /* 内边距 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 阴影效果 */
  display: flex;
  flex-direction: column; /* 垂直排列 */
  margin-right: 2rem;
  margin-top: 2rem;
}

.table-title {
  font-size: 18px; /* 标题字体大小 */
  font-weight: bold; /* 加粗 */
  margin-bottom: 1rem; /* 标题与表格之间的间距 */
  text-align: center; /* 居中对齐 */
}
</style>
