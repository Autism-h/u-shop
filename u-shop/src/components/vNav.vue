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
        v-for="item in getUserInfo.menus"
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
};
</script>

<style  lang="" scoped>
.el-menu {
  width: 200px;
  border: none;
}
</style>
