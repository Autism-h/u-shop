<template>
  <div>
    <el-table :data="getMemberList" style="width: 100%">
      <el-table-column label="用户编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="240">
        <template slot-scope="scope">
          <span style="">{{ scope.row.phone }}</span>
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
          <el-button size="mini" type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMemberListAction();
  },
  computed: {
    ...mapGetters({
      'getMemberList': "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      getMemberListAction: "member/getMemberListAction",
    }),
    //封装编辑事件
    edit(id) {
      this.$emit("edit", id); //传到父组件
    },
  },
};
</script>

<style  lang="" scoped>
.list {
  overflow: auto;
}
.img{
  widows: 60px;
  height: 60px;
}
.el-table{
  height: calc(100vh - 60px);
}
</style>
