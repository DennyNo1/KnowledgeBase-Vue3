<script setup>
import { reactive, ref, computed } from "vue";
import { Iphone } from "@element-plus/icons-vue";
import { fetchScoreList, saveQueryRecords, userSendEmail } from "@/api/score";
import { useLoginStore } from "@/store/login.js";
import { ElMessage } from "element-plus";
import * as XLSX from "xlsx";
const loginStore = useLoginStore();

// 表单数据
const scoreForm = ref({
  bil_month: "",
  sales_phone_number: "",
});
const scoreFormRef = ref();
const dataList = ref([]);
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
  //判断已登录的手机号是否与查询的手机号一致;
  if (
    !loginStore.userInfo.phone == scoreForm.value.sales_phone_number ||
    !loginStore.userInfo.phone
  ) {
    //
    ElMessage({
      message: "目前仅允许查询自己的手机号，请重新输入",
      type: "warning",
    });
    return;
  }

  await scoreFormRef.value.validate();

  //日期格式化
  scoreForm.value.bil_month = dateFormat(scoreForm.value.bil_month);
  //   console.log("查询表单数据：", scoreForm.value.bil_month);
  await fetchScoreList(
    scoreForm.value.bil_month,
    scoreForm.value.sales_phone_number,
    "1",
    "2999"
  ).then((res) => {
    dataList.value = res.data.data.data;
    if (dataList.value.length == 0)
      ElMessage({
        message: "暂无数据",
        type: "warning",
      });
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

const exportToEmail = async () => {
  if (dataList.value.length == 0) {
    ElMessage({
      message: "请先查询积分或者暂无数据",
      type: "warning",
    });
    return;
  }
  // 将数据转换为工作sheet
  const worksheet = XLSX.utils.json_to_sheet(
    sortedDataWithChineseHeaders.value
  );

  // 创建新工作簿
  const workbook = XLSX.utils.book_new();

  // 将工作sheet添加到工作簿中
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 生成Excel文件的二进制数据
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array", // 获取二进制数组
  });

  // 创建Blob对象
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  // 创建FormData实例
  const formData = new FormData();

  // 向formData对象添加键值对
  formData.append("phone", scoreForm.value.sales_phone_number);

  // 将Blob对象添加到FormData中，并指定文件名
  formData.append(
    "attachment",
    blob,
    `${scoreForm.value.sales_phone_number}-${scoreForm.value.bil_month}.xlsx`
  );

  const response = await userSendEmail(formData);
  console.log(response);
  if (response.code == 200) {
    ElMessage({
      message: response.msg,
      type: "success",
    });
  } else {
    ElMessage({
      message: response.msg,
      type: "error",
    });
  }
  console.log(response);

  // 保存查询记录
  saveQueryRecords(
    loginStore.userInfo.phone,
    scoreForm.value.bil_month,
    scoreForm.value.sales_phone_number,
    dataList.value.length
  );
};

const exportToExcel = () => {
  if (dataList.value.length == 0) {
    ElMessage({
      message: "请先查询积分或者暂无数据",
      type: "warning",
    });
    return;
  }

  // 将数据转换为工作sheet
  const worksheet = XLSX.utils.json_to_sheet(
    sortedDataWithChineseHeaders.value
  );

  // 创建新工作簿
  const workbook = XLSX.utils.book_new();

  // 将工作sheet添加到工作簿中
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 生成文件并下载
  XLSX.writeFile(
    workbook,
    `${scoreForm.value.sales_phone_number + scoreForm.value.bil_month}.xlsx`
  );

  // 保存查询记录
  saveQueryRecords(
    loginStore.userInfo.phone,
    scoreForm.value.bil_month,
    scoreForm.value.sales_phone_number,
    dataList.value.length
  );
};

// 中文表头映射
const chineseHeaders = [
  "积分",
  "积分方案",
  "原始账期",
  "奖励/扣回/激励",
  "积分类型",
  "本地激励",
  "营销工号",
  "资产业务号码",
  "营销人员手机号码",
  "asset_integ_id",
  "积分类型编码",
  "扣回规则",
  "销售品",
  "积分策略",
  "营销人员",
  "人员支局",
  "数据更新日期",
  "账期",
  "人员县分",
  "调整原因",
];

// 英文属性名
const englishKeys = [
  "SCORE",
  "score_offer_name",
  "org_bil_month",
  "jf_type",
  "NEW_SCORE_TYPE_NAME",
  "bdjl",
  "sales_emp_code",
  "acc_nbr",
  "sales_phone_number",
  "asset_integ_id",
  "NEW_SCORE_TYPE_id",
  "fine_rule_name",
  "prom_name",
  "score_strategy_name",
  "sales_employee_name",
  "zj_area_name",
  "update_dt",
  "bil_month",
  "fj_area_name",
  "adjust_reason",
];

// 计算属性：对数据进行排序
const sortedData = computed(() => {
  return dataList.value
    .slice() // 创建副本以避免修改原始数据
    .sort((a, b) => {
      // 先按 jf_type 排序
      if (a.jf_type < b.jf_type) return -1;
      if (a.jf_type > b.jf_type) return 1;
      // 如果 jf_type 相同，再按 acc_nbr 排序
      return a.acc_nbr.localeCompare(b.acc_nbr);
    });
});

// 计算属性：将排序后的数据映射为中文表头
const sortedDataWithChineseHeaders = computed(() => {
  return sortedData.value.map((item) => {
    const newItem = {};
    englishKeys.forEach((key, index) => {
      newItem[chineseHeaders[index]] = item[key];
    });
    return newItem;
  });
});
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
      <!-- 标题和按钮放在同一行 -->
      <div class="header-container">
        <h3 class="table-title">查询结果</h3>
        <div class="button-container">
          <button class="btn btn-primary" @click="exportToExcel">下载</button>
          <button class="btn btn-secondary" @click="exportToEmail">
            发送至邮箱
          </button>
        </div>
      </div>

      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" label="月份">{{
          scoreForm.bil_month
        }}</el-table-column>
        <el-table-column prop="acc_nbr" label="资产业务号码"></el-table-column>
        <el-table-column prop="jf_type" label="积分类型"></el-table-column>
        <el-table-column prop="SCORE" label="积分"></el-table-column>
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

/* 标题和按钮的容器 */
.header-container {
  display: flex;
  justify-content: space-between; /* 标题靠左，按钮靠右 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 1.5rem; /* 与表格的间距 */
}

.table-title {
  font-size: 18px; /* 标题字体大小 */
  font-weight: bold; /* 加粗 */
  margin: 0; /* 去掉默认的 margin */
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  gap: 1rem; /* 按钮之间的间距 */
}

/* 按钮基础样式 */
.btn {
  padding: 0.5rem 1rem; /* 内边距 */
  border: none; /* 去掉边框 */
  border-radius: 4px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  font-size: 14px; /* 字体大小 */
  font-weight: 500; /* 字体粗细 */
  transition: background-color 0.3s ease; /* 背景颜色过渡效果 */
}

/* 主要按钮样式 */
.btn-primary {
  background-color: #409eff; /* 背景颜色 */
  color: #fff; /* 文字颜色 */
}

.btn-primary:hover {
  background-color: #66b1ff; /* 鼠标悬停时的背景颜色 */
}

/* 次要按钮样式 */
.btn-secondary {
  background-color: #67c23a; /* 背景颜色 */
  color: #fff; /* 文字颜色 */
}

.btn-secondary:hover {
  background-color: #85ce61; /* 鼠标悬停时的背景颜色 */
}
</style>
