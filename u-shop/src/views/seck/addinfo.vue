<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀' : '编辑秒杀'"
      :visible.sync="addInfo.ishow"
      :before-close="cancel"
      center
    >
      <el-form :model="seck" :rules="rules" ref="ruleForm">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input
            clearable
            v-model="seck.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="timer"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="seck.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="seck.second_cateid" placeholder="请选择" @change="changegoods(false)">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="seck.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="upDate('ruleForm')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Seckadd, SeckInfo, SeckEdit, GoodsList } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      editor: null,
      seck: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入秒杀活动名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      secondCate: [],
      specsAttr: [],
      timer: "",
      goodsArr: [],
    };
  },
  props: ["addInfo"],
  methods: {
    changeCate(n) {
      let index = this.getCateList.findIndex(
        (item) => this.seck.first_cateid == item.id
      );
      this.secondCate = this.getCateList[index].children;
      if (!n) {
        this.seck.second_cateid = "";
      }
    },
    changeSpecs(n) {
      let index = this.getSpecsList.findIndex(
        (item) => this.goods.specsid == item.id
      );
      this.specsAttr = this.getSpecsList[index].attrs;
      if (!n) {
        this.goods.specsattr = [];
      }
    },
    changegoods(n) {
      GoodsList({
        fid: this.seck.first_cateid,
        sid: this.seck.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list ? res.data.list : [];
        }
      });
      if (!n) {
        this.seck.goodsid = "";
      }
    },
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
      getSeckListAction: "seck/getSeckListAction",
    }),
    //取消
    cancel() {
      this.$emit("cancel", {
        ishow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //确定/取消后重置
    reset() {
      this.seck = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      this.timer = ''
      this.$refs["ruleForm"].resetFields();
    },
    lookUp(id) {
      SeckInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.seck = res.data.list;
            this.seck.id = id;
            this.changeCate(true);
            this.changeSpecs(true);
            this.changegoods(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //封装一个编辑事件
    upDate() {
      this.seck.begintime = new Date(this.timer[0]).getTime();
      this.seck.endtime = new Date(this.timer[0]).getTime();
      SeckEdit(this.seck)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功");
            this.cancel();
            this.getSeckListAction();
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch((err) => {
          console.log(err, "失败");
        });
    },
    //确定添加
    add(formName) {
      this.seck.begintime = new Date(this.timer[0]).getTime();
      this.seck.endtime = new Date(this.timer[0]).getTime();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Seckadd(this.seck).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("操作成功");
              this.cancel();
              this.getSeckListAction();
            } else {
              this.$message.error("操作失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getCateListAction();
    this.getSeckListAction();
  },
  computed: {
    ...mapGetters({
      getSeckList: "seck/getSeckList",
      getCateList: "cate/getCateList",
      getSpecsList: "specs/getSpecsList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
