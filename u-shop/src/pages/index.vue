<template>
  <div>
    <el-container>
      <el-header>U商城后台管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="24">
              <v-nav></v-nav>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../components/vNav'
export default {
  data() {
    return {};
  },
  components:{
      vNav
  }
};
</script>

<style  lang="" scoped>
html,
body {
  height: 100%;
}
.el-header {
  background: #518ecb;
  line-height: 60px;
  font-size: 16px;
  color: #fff;
}
.el-aside {
  background: #3d5f81;
  height: calc(100vh - 60px);
}
.el-main{
  height: calc(100vh - 60px);
  overflow: hidden;
}
/* .el-aside::-webkit-scrollbar {
  width: 4px;
}
.el-aside::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.2);
} */
</style>
