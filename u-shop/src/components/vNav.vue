<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      background-color="#3d5f81"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in navList"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="list.url"
            v-for="list in item.children"
            :key="list.id"
            >{{ list.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "/home",
      navList: [],
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
    if (sessionStorage.getItem("login")) {
      this.navList = JSON.parse(sessionStorage.getItem("login")).menus;
    }
  },
};
</script>

<style  lang="" scoped>
.el-menu {
  width: 200px;
  border: none;
}
</style>
