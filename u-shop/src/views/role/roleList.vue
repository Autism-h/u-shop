<template>
  <div>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column label="角色编号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" width="200">
        <template slot-scope="scope">
          <span style="">{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.status==1?'正常':'禁用' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row.id)" type="primary">编辑</el-button>
          <el-button size="mini" @click="del(scope.row.id)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delRole } from "../../util/axios";
export default {
  data() {
    return {

    };
  },
  mounted() {
    this.getRolist();
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  methods: {
    ...mapActions({
      getRolist: "role/getRolistAction",
    }),
    edit(id){
      this.$emit('edit',id)
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRole({ id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.getRolist();
              } else {
                this.$message.error(res.data.msg);
              }
            })
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
