<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="用户编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{
              scope.row.status == 1 ? "正常" : "禁用"
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row.uid)" type="primary">编辑</el-button>
          <el-button size="mini" @click="del(scope.row.uid)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="getUserSize"
      background
      layout="prev, pager, next"
      :total="getUserCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delUser } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      getRoleList: "role/getRoleList",
      getUserCount: "user/getUserCount",
      getUserSize: "user/getUserSize",
    }),
  },
  mounted() {
    this.getUserList();
    this.getRolistAction();
    this.getUserCountAction();
  },
  methods: {
    ...mapActions({
      'getUserList': "user/getUserListAction",
      getRolistAction: "role/getRolistAction",
      getUserCountAction: "user/getUserCountAction",
      changePageAction: "user/changePageAction",
    }),
    changePage(n) {
      this.changePageAction(n);
    },
    edit(id){
      this.$emit('edit',id)
    },
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          delUser({
            uid: id,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              // //删除之后要重新调取列表
              this.getUserList();
              // //重新调取总条数
              this.getUserCountAction()
            } else {
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
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-table{
  height: calc(100vh - 60px);
}
</style>
