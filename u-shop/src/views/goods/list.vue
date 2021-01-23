<template>
  <div>
    <el-table :data="getGoodsList" style="width: 100%">
      <el-table-column label="商品编号" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="120">
        <template slot-scope="scope">
          <span style="">{{ scope.row.goodsname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="120">
        <template slot-scope="scope">
          <span style="">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格" width="120">
        <template slot-scope="scope">
          <span style="">{{ scope.row.market_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.img != 0">
            <img class="img" :src="scope.row.img?$imgUrl+scope.row.img:''" alt="">
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="80">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.isnew==1?'是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="80">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.ishot==1?'是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
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
    <el-pagination
      :page-size="getGoodsSize"
      background
      layout="prev, pager, next"
      :total="getGoodsCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { GoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsListAction();
    this.getGoodsCountAction();
  },
  computed: {
    ...mapGetters({
      'getGoodsList': "goods/getGoodsList",
      'getGoodsSize': "goods/getGoodsSize",
      'getGoodsCount': "goods/getGoodsCount",
    }),
  },
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getGoodsCountAction: "goods/getGoodsCountAction",
      changePageAction: "goods/changePageAction",
    }),
    changePage(n) {
      this.changePageAction(n);
    },
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
          GoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //当列表删除成功触发行动
              this.getGoodsListAction();
              this.getGoodsCountAction()
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
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-table{
  height: calc(100vh - 60px);
}
</style>
