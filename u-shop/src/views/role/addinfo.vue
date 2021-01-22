<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.iShow"
      :before-close="Cancel"
      center
    >
      <el-form :model="role" :rules="rules" ref="ruleForm">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input clearable v-model="role.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth" prop="">
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
            default-expand-all
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="role.status"
            active-color="#409EFF"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          @click="addrole('ruleForm')"
          type="primary"
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
import { addRole, roleInfo, roleEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      role: {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    this.getRolist();
    this.getMenuListAction();
  },
  methods: {
    ...mapActions({
      getRolist: "role/getRolistAction",
      getMenuListAction: "menu/getMenuListAction",
    }),
    //取消
    Cancel() {
      this.$emit("Cancel", {
        iShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //确定后重置
    reset() {
      this.role = {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //获取一条数据
    lookUp(id) {
      roleInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.role = res.data.list;
            //把menus的返回值设置给角色权限
            this.$refs.tree.setCheckedKeys(this.role.menus.split(","));
            this.role.id = id;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //封装一个编辑事件
    upDate() {
      //调取添加接口
      this.role.menus = this.$refs.tree.getCheckedKeys().join(',')
      roleEdit(this.role)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功");
            this.Cancel();
            this.getRolist();
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加
    addrole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取添加接口
          this.role.menus = this.$refs.tree.getCheckedKeys().join(',')
          addRole(this.role)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("操作成功");
                this.Cancel();
                this.getRolist();
              } else {
                this.$message.error("操作失败");
              }
            })
            .catch((err) => {
              console.log(err);
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
</style>
