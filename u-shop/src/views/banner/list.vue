<template>
  <div>
    <el-table :data="getBannerList" style="width: 100%" height="480">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="轮播图标题" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="240">
        <template slot-scope="scope">
          <div v-if="scope.row.img != 0">
            <img class="img" :src="scope.row.img?$imgUrl+scope.row.img:''" alt="">
          </div>
          <div v-else></div>
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
import { BannerDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getBannerListAction();
  },
  computed: {
    ...mapGetters({
      'getBannerList': "banner/getBannerList",
    }),
  },
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
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
          BannerDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //当列表删除成功触发行动
              this.getBannerListAction();
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
.img{
  widows: 60px;
  height: 60px;
}
</style>
