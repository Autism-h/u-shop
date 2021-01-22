<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.iShow"
      :before-close="cancel"
      center
    >
      <el-form :model="specs" :rules="rules" ref="ruleForm">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input
            clearable
            v-model="specs.specsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, idx) in attrsArr"
          :key="idx"
        >
          <el-input
            class="inp"
            clearable
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="idx == 0" type="primary" @click="addAttrs"
            >新增规格属性</el-button
          >
          <el-button v-else type="danger" @click="delAttrs(item)"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specs.status"
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
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSpecs, SpecsEdit, specsInfo } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      attrsArr: [
        {
          value: "",
        },
      ],
      specs: {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
    }),
  },
  mounted() {
    this.getSpecsListAction();
  },
  methods: {
    addAttrs() {
      if (this.attrsArr.length <= 6) {
        this.attrsArr.push({
          value: "",
        });
      } else {
        this.$message.warning("只能添加6个规格");
      }
    },
    delAttrs(item) {
      var index = this.attrsArr.indexOf(item);
      if (index !== -1) {
        this.attrsArr.splice(index, 1);
      }
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getSpecsCountAction: "specs/getSpecsCountAction",
    }),
    cancel() {
      this.$emit("cancel", {
        iShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //重置
    reset() {
      this.specs = {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      };
      this.attrsArr = [
        {
          value: "",
        },
      ];
      this.$refs["ruleForm"].resetFields();
    },
    lookInfo(id) {
      specsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.specs = res.data.list[0];
          this.specs.id = id;
          this.specs.attrs.map((item, idx) => {
            if (idx == 0) {
              this.attrsArr[0].value = item;
            } else {
              this.attrsArr.push({
                value: item,
              });
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //添加
    add() {
      this.specs.attrs = this.attrsArr.map((item) => item.value).join(",");
      addSpecs(this.specs).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("操作成功");
          this.cancel();
          this.getSpecsListAction();
          this.getSpecsCountAction();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    //封装一个修改事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.specs.attrs = this.attrsArr.map((item) => item.value).join(",");
          //调取修改接口
          SpecsEdit(this.specs).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsListAction();
              this.getSpecsCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
.inp {
  width: 74%;
}
</style>
