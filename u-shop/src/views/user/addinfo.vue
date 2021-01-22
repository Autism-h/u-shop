<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="addInfo.iShow"
      :before-close="cancel"
      center
    >
      <el-form :model="user" :rules="rules" ref="ruleForm">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input clearable v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="user.status"
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
import { addUser, userInfo, editUser } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请选择上级菜单", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
      getUserList: "user/getUserList",
    }),
  },
  mounted() {
    this.getRolistAction();
    this.getUserListAction();
  },
  methods: {
    ...mapActions({
      getRolistAction: "role/getRolistAction",
      getUserListAction: "user/getUserListAction",
      getUserCountAction: "user/getUserCountAction",
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
      this.user = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
    },
    lookInfo(id) {
      userInfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.uid = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //添加
    add() {
      addUser(this.user).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("操作成功");
          this.cancel();
          this.getUserListAction();
          this.getUserCountAction();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    //封装一个修改事件
    update(formName) {
      //当前密码如果修改就是重新赋值即可，如果为空就是上一次的密码
      //修改方法执行，触发validate验证器
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取修改接口
          editUser(this.user).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getUserListAction();
              this.getUserCountAction();
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
</style>
