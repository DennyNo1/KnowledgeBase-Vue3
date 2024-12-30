<script setup>
import { articleRankService } from "@/api/article.js";
import { onMounted, ref } from "vue";
const tableData = ref([]);
onMounted(async () => {
  const res = await articleRankService();
  tableData.value = res.data;
  console.log(tableData);
  acc();
  rank();
});

//统计第一遍的数据
const numberData = ref([]);
function acc() {
  // 使用 reduce 方法进行汇总，并计算课件总量
  numberData.value = Object.values(
    tableData.value.reduce((acc, item) => {
      if (!acc[item.uploader]) {
        acc[item.uploader] = {
          uploader: item.uploader,
          totalClickCount: 0,
          articleCount: 0, // 新增属性：课件总量
        };
      }
      acc[item.uploader].totalClickCount += item.clickCount;
      acc[item.uploader].articleCount++; // 每个uploader的课件数量加一
      return acc;
    }, {})
  ).sort((a, b) => b.totalClickCount - a.totalClickCount); // 按 totalClickCount 降序排列
}

function rank() {
  // 定义权重系数
  const clickWeight = 0.6; // 浏览量权重 60%
  const countWeight = 0.4; // 文章数量权重 40%

  // 获取上传者的总数
  const uploaderCount = numberData.value.length;

  // 根据 totalClickCount 和 articleCount 分别对数据进行排序
  const sortedByClicks = [...numberData.value].sort(
    (a, b) => b.totalClickCount - a.totalClickCount
  );
  const sortedByArticles = [...numberData.value].sort(
    (a, b) => b.articleCount - a.articleCount
  );

  // 创建一个映射表用于快速查找排名
  const clickRankMap = new Map();
  const articleRankMap = new Map();

  sortedByClicks.forEach((item, index) => {
    clickRankMap.set(item.uploader, uploaderCount - index);
  });

  sortedByArticles.forEach((item, index) => {
    articleRankMap.set(item.uploader, uploaderCount - index);
  });

  // 计算加权得分并更新 finalData 数组
  finalData.value = numberData.value.map((item) => {
    // 获取当前 uploader 的排名分数
    const clickScore = clickRankMap.get(item.uploader) || 0;
    const articleScore = articleRankMap.get(item.uploader) || 0;

    // 计算加权得分
    const weightedScore = clickScore * clickWeight + articleScore * countWeight;

    // 返回新的对象，包含原始信息以及新计算的加权得分
    return {
      ...item,
      clickScore, // 添加点击量排名分数
      articleScore, // 添加文章数量排名分数
      weightedScore: weightedScore, // 添加新的加权得分属性
    };
  });

  // 按照加权得分降序排序
  finalData.value.sort((a, b) => b.weightedScore - a.weightedScore);
  // 为每个 uploader 分配综合排名
  finalData.value = finalData.value.map((item, index) => ({
    ...item,
    overallRank: index + 1, // 综合排名，从1开始
  }));

  console.log(finalData.value);
}
//加权得分
const finalData = ref([]);
</script>
<template>
  <div
    style="
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      flex-direction: column;
    "
  >
    <h1>最终排名</h1>
    <div>
      <el-table :data="finalData" border style="width: 100%">
        <el-table-column prop="overallRank" label="排名" width="100" />
        <el-table-column prop="uploader" label="原作者" width="100" />
        <el-table-column prop="weightedScore" label="权重得分" width="360" />
      </el-table>
    </div>
    <h1>统计数据</h1>
    <div>
      <el-table :data="numberData" border style="width: 100%">
        <el-table-column prop="uploader" label="原作者" width="100" />
        <el-table-column
          prop="totalClickCount"
          label="课件总点击量"
          width="360"
        />
        <el-table-column prop="articleCount" label="课件上传总量" width="100" />
      </el-table>
    </div>
    <h1>原始数据</h1>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="clickCount" label="点击量" width="100" />
        <el-table-column prop="title" label="课件标题" width="360" />
        <el-table-column prop="uploader" label="原作者" width="100" />
      </el-table>
    </div>
  </div>
</template>
