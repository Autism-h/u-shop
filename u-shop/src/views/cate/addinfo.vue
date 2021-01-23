<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="addInfo.ishow"
      :before-close="cancel"
      center
    >
      <el-form :model="cate" :rules="rules" ref="ruleForm">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="cate.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
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
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input
            clearable
            v-model="cate.catename"
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
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cate.status"
            active-color="#409EFF"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
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
import { addCate, CateInfo, CateEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      cate: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      formLabelWidth: "120px",
      iconList: [
        "el-icon-picture",
        "el-icon-camera-solid",
        "el-icon-s-cooperation",
        "el-icon-s-shop",
        "el-icon-s-order",
        "el-icon-s-tools",
        "el-icon-s-goods",
      ],
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "",
      fileList: [],
    };
  },
  props: ["addInfo"],
  methods: {
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
      getCateListAction: "cate/getCateListAction",
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
      this.cate = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      this.fileList = [];
      this.$refs["ruleForm"].resetFields();
    },
    lookUp(id) {
      CateInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.cate = res.data.list;
            this.cate.id = id;
            this.fileList = this.cate.img
              ? [{ url: this.$imgUrl + this.cate.img }]
              : [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //封装一个编辑事件
    upDate() {
      this.cate.img = this.imgUrl ? this.imgUrl : this.cate.img
      let file = new FormData();
      for (let i in this.cate) {
        file.append(i, this.cate[i]);
      }
      CateEdit(file)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功");
            this.cancel();
            this.getCateListAction();
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
          this.img = this.imgUrl
          let file = new FormData();
          for (let i in this.cate) {
            file.append(i, this.cate[i]);
          }
          file.append("img", this.imgUrl);
          addCate(file)
            .then((res) => {
              if (res.data.code == 200) {
                console.log(res, "添加成功");
                this.$message.success("操作成功");
                this.cancel();
                this.getCateListAction();
              } else {
                this.$message.error("操作失败");
                console.log(err);
              }
            })
            .catch((err) => {
              console.log(err, "失败");
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
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
