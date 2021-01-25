<template>
  <div class="login">
    <el-form
      :model="loginFrom"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input clearable v-model="loginFrom.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input clearable show-password v-model="loginFrom.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from "../util/axios";
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
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
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.loginFrom).then((res) => {
            if (res.data.code == 200) {
              // sessionStorage.setItem('login',JSON.stringify(res.data.list))
              this.changeUserInfoAction(res.data.list)
              this.$message.success(res.data.msg);
              this.$router.push({ path: "/home" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          this.$message.error("请输入用户名或密码");
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
.login {
  background: #eee;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.el-form {
  width: 500px;
  height: 300px;
  background: #fff;
  padding: 60px 60px 0 5px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -150px;
}
</style>
