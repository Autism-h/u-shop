<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.ishow"
      :before-close="cancel"
      center
      @opened="goodsEdit"
    >
      <el-form :model="goods" :rules="rules" ref="ruleForm">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="goods.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <!-- <el-option label="一级分类" :value="0"></el-option> -->
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <!-- <el-option label="二级分类" :value="0"></el-option> -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input
            clearable
            v-model="goods.goodsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input
            clearable
            v-model="goods.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input
            clearable
            v-model="goods.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :limit="1"
            :file-list="fileList"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            v-model="goods.specsid"
            placeholder="请选择"
            @change="changeSpecs(false)"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select multiple v-model="goods.specsattr" placeholder="请选择">
            <el-option
              v-for="item in specsAttr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goods.status"
            active-color="#409EFF"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
import { goodsadd, goodsInfo, GoodsEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import wangeditor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      goods: {
        id: "", //分类编号，必填项
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: 0, //商品价格
        market_price: 0, //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1, //状态1正常2禁用
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "",
      fileList: [],
      secondCate: [],
      specsAttr: [],
    };
  },
  props: ["addInfo"],
  methods: {
    //富文本
    goodsEdit() {
      //实例化编辑器的构造函数
      this.editor = new wangeditor("#editor");
      // 初始化创建
      this.editor.create();
      this.editor.txt.html(this.goods.description);
    },
    changeCate(n) {
      let index = this.getCateList.findIndex(
        (item) => this.goods.first_cateid == item.id
      );
      this.secondCate = this.getCateList[index].children;
      if (!n) {
        this.goods.second_cateid = "";
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
    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCateListAction: "cate/getCateListAction",
      getSpecsListAction: "specs/getSpecsListAction",
    }),
    onChange(file) {
      this.imgUrl = file.raw;
    },
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
      this.goods = {
        id: "", //分类编号，必填项
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: 0, //商品价格
        market_price: 0, //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1, //状态1正常2禁用
      };
      this.fileList = [];
      this.$refs["ruleForm"].resetFields();
    },
    lookUp(id) {
      goodsInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            // console.log(res);
            this.goods = res.data.list;
            this.goods.id = id;
            this.fileList = this.goods.img
              ? [{ url: this.$imgUrl + this.goods.img }]
              : "";
            this.goods.specsattr = this.goods.specsattr
              ? this.goods.specsattr.split(",")
              : [];
            this.changeCate(true);
            this.changeSpecs(true);
            // this.editor.txt.html(this.goods.description)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //封装一个编辑事件
    upDate() {
      this.goods.description = this.editor.txt.html();
      let file = new FormData();
      for (let i in this.goods) {
        file.append(i, this.goods[i]);
      }
      this.goods.img = this.imgUrl ? this.imgUrl : this.goods.img;
      GoodsEdit(file)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功");
            this.cancel();
            this.getGoodsListAction();
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.goods.description = this.editor.txt.html();
          this.goods.specsattr = this.goods.specsattr
            ? this.goods.specsattr.join(",")
            : "";
          this.goods.img = this.imgUrl;
          let file = new FormData();
          for (let i in this.goods) {
            file.append(i, this.goods[i]);
          }
          file.append("img", this.imgUrl);
          goodsadd(file).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("操作成功");
              this.cancel();
              this.getGoodsListAction();
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
    this.getGoodsListAction();
    this.getSpecsListAction();
    this.getCateListAction();
  },
  computed: {
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
      getCateList: "cate/getCateList",
      getSpecsList: "specs/getSpecsList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
