<template>
  <div>
    <el-table :data="getSpecsList" style="width: 100%">
      <el-table-column label="规格编号" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格名称" width="140">
        <template slot-scope="scope">
          <span style="">{{ scope.row.specsname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格属性" width="280">
        <template slot-scope="scope">
          <el-tag v-for="attr in scope.row.attrs"  type="info" :key='attr'>{{attr}}</el-tag>
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
          <el-button size="mini" @click="edit(scope.row.id)" type="primary">编辑</el-button>
          <el-button size="mini" @click="del(scope.row.id)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="getSpecsSize"
      background
      layout="prev, pager, next"
      :total="getSpecsCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delSpecs } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      'getSpecsList': "specs/getSpecsList",
      getSpecsCount: "specs/getSpecsCount",
      getSpecsSize: "specs/getSpecsSize",
    }),
  },
  mounted() {
    this.getSpecsListAction();
    this.getSpecsCountAction();
  },
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getSpecsCountAction:'specs/getSpecsCountAction',
      changePageAction: "specs/changePageAction",
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
          delSpecs({
            id
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSpecsListAction()
              this.getSpecsCountAction();
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
</style>
