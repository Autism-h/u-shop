<template>
  <div>
    <el-bread></el-bread>
    <el-button @click="toRole" type="primary" plain size="small"
      >添加</el-button
    >
    <addinfo ref="vRole" @Cancel="Cancel" :addInfo="addInfo"></addinfo>
    <vlist @edit='edit'></vlist>
  </div>
</template>

<script>
import vlist from "./roleList";
import addinfo from "./addinfo";
export default {
  data() {
    return {
      addInfo:{
          iShow: false,
          isAdd:true
      }
    };
  },
  components: {
    vlist,
    addinfo,
  },
  methods: {
    toRole() {
      this.addInfo.iShow = true;
      this.addInfo.isAdd = true;
    },
    Cancel(e) {
      this.addInfo = e;
    },
    edit(e){
        this.addInfo.iShow = true
        this.addInfo.isAdd = false
        this.$refs.vRole.lookUp(e)
    }
  },
};
</script>

<style  lang="" scoped>
</style>
