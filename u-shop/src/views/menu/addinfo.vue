<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.ishow"
      :before-close="cancel"
      center
    >
      <el-form :model="menu" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input clearable v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="menu.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menu.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option
              v-for="item in indexUrl"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
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
import { addmenu, menuInfo, menuEdit } from "../../util/axios";
import { indexUrl } from "../../router";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: {
        pid: 0, //上级分类编号
        title: "",
        icon: "",
        type: 1, //类型1目录2菜单
        url: "",
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
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
        "el-icon-s-goods"
      ],
      indexUrl,
    };
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      menuList: "menu/getMenuListAction",
    }),
    //取消
    cancel() {
      this.$emit("cancel", {
        ishow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //确定后重置
    reset() {
      this.menu = {
        pid: 0, //上级分类编号
        title: "",
        icon: "",
        type: 1, //类型1目录2菜单
        url: "",
        status: 1, //状态1正常2禁用
      };
    },
    lookUp(id) {
      menuInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.menu = res.data.list;
            this.menu.id = id;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //封装一个编辑事件
    upDate() {
      menuEdit(this.menu)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功");
            this.cancel();
            this.menuList();
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
          addmenu(this.menu)
            .then((res) => {
              if (res.data.code == 200) {
                // console.log(res, "添加成功");
                this.$message.success("操作成功");
                this.cancel();
                this.menuList();
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
  mounted() {},
  computed: {
    ...mapGetters({
      menulist: "menu/getMenuList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
