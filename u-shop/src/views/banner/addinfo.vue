<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.ishow"
      :before-close="cancel"
      center
    >
      <el-form :model="banner" :rules="rules" ref="ruleForm">
        <el-form-item
          label="标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input
            clearable
            v-model="banner.title"
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
            v-model="banner.status"
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
import { addBanner, BannerInfo, BannerEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      banner: {
        title: '', //轮播图名称
        img: "", //图片(文件，一般用于二级轮播图)
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
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
      'getBannerListAction': "banner/getBannerListAction",
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
      this.banner = {
        title: '', //轮播图名称
        img: "", //图片(文件，一般用于二级轮播图)
        status: 1, //状态1正常2禁用
      };
      this.fileList = [];
      this.$refs["ruleForm"].resetFields();
    },
    lookUp(id) {
      BannerInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.banner = res.data.list;
            this.banner.id = id;
            this.fileList = this.banner.img
              ? [{ url: this.$imgUrl + this.banner.img }]
              : "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //封装一个编辑事件
    upDate() {
      this.banner.img = this.imgUrl ? this.imgUrl : this.banner.img
      let file = new FormData();
      for (let i in this.banner) {
        file.append(i, this.banner[i]);
      }
      BannerEdit(file)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功");
            this.cancel();
            this.getBannerListAction();
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
          for (let i in this.banner) {
            file.append(i, this.banner[i]);
          }
          file.append("img", this.imgUrl);
          addBanner(file)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("操作成功");
                this.cancel();
                this.getBannerListAction();
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
    this.getBannerListAction();
  },
  computed: {
    ...mapGetters({
      'getBannerList': "banner/getBannerList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
