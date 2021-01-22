<template>
  <div>
    <el-bread></el-bread>
    <el-button @click="toUser" type="primary" plain size="small"
      >添加</el-button
    >
    <addinfo ref="vDialog" :addInfo="addInfo" @cancel="cancel"></addinfo>
    <vlist @edit='edit'></vlist>
  </div>
</template>

<script>
import vlist from "./userList";
import addinfo from "./addinfo";
export default {
  data() {
    return {
      addInfo: {
        iShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vlist,
    addinfo,
  },
  methods: {
    toUser() {
      this.addInfo.iShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e) {
      this.addInfo = e;
    },
    edit(e) {
      //打开编辑弹框
      this.addInfo.iShow = true;
      this.addInfo.isAdd = false;
      this.$refs.vDialog.lookInfo(e);
    },
  },
};
</script>

<style  lang="" scoped>
</style>
