<template>
  <div>
    <el-table :data="menulist" style="width: 100%" default-expand-all row-key="id" :tree-props="{children: 'children'}">
      <el-table-column label="菜单编号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单名称" width="140">
        <template slot-scope="scope">
          <span style="">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级菜单" width="140">
        <template slot-scope="scope">
          <span style="">{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单图标" width="140">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="菜单地址" width="140">
        <template slot-scope="scope">
          <span style="">{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.status==1?'正常':'禁用' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="Del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delMenu } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMenuListAction();
  },
  computed: {
    ...mapGetters({
      menulist: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
    }),
    //封装编辑事件
    edit(id) {
      this.$emit("edit", id); //传到父组件
    },
    Del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu({ id }).then((res) => {
            if (res.data.code == 200) {
              console.log("删除成功");
              this.$message.success(res.data.msg);
              //当列表删除成功触发行动
              this.getMenuListAction();
            }else{
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style  lang="" scoped>
.list {
  overflow: auto;
}
.el-table{
  height: calc(100vh - 60px);
}
</style>
