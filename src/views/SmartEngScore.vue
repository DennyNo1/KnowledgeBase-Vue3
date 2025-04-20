<script>
import { ref } from "vue";

export default {
  setup() {
    // 模拟数据
    const tableData = ref([
      // { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
      // { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
      // { id: 3, name: "Charlie", age: 35, email: "charlie@example.com" },
    ]);

    // 表单数据
    const form = ref({
      id: null,
      name: "",
      age: null,
      email: "",
    });

    const date = ref("");

    // 对话框状态
    const dialogVisible = ref(false);
    const isEditMode = ref(false);

    // 新增用户
    const handleAdd = () => {
      form.value = { id: null, name: "", age: null, email: "" };
      isEditMode.value = false;
      dialogVisible.value = true;
    };

    // 编辑用户
    const handleEdit = (row) => {
      form.value = { ...row }; // 复制当前行数据
      isEditMode.value = true;
      dialogVisible.value = true;
    };

    // 删除用户
    const handleDelete = (id) => {
      tableData.value = tableData.value.filter((item) => item.id !== id);
    };

    // 提交表单
    const handleSubmit = () => {
      if (isEditMode.value) {
        // 编辑模式：更新数据
        const index = tableData.value.findIndex(
          (item) => item.id === form.value.id
        );
        if (index !== -1) {
          tableData.value[index] = { ...form.value };
        }
      } else {
        // 新增模式：添加数据
        form.value.id = tableData.value.length + 1; // 自动生成 ID
        tableData.value.push({ ...form.value });
      }
      dialogVisible.value = false; // 关闭对话框
    };

    return {
      tableData,
      form,
      dialogVisible,
      isEditMode,
      handleAdd,
      handleEdit,
      handleDelete,
      handleSubmit,
    };
  },
};
</script>
<template>
  <div>
    <!-- 日期选择器 -->
    <el-date-picker
      v-model="date"
      type="month"
      placeholder="请选择你要查询的账期"
      style="width: 100%"
    />
    <div class="fixed-button">
      <el-button type="primary">导入表格</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="age" label="年龄" width="100" />
      <el-table-column prop="email" label="邮箱" />

      <!-- 操作列 -->
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditMode ? '编辑用户' : '新增用户'"
      width="30%"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" placeholder="请输入年龄" type="number" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="fixed-button">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
  </div>
</template>
<style scoped>
.fixed-button {
  display: flex;
  justify-content: flex-end;
}
</style>
