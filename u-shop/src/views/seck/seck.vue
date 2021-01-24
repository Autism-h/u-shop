<template>
  <div>
    <el-bread></el-bread>
    <el-button @click="toOpen" type="primary" plain size="small">添加</el-button>
    <addinfo ref="vAdd" @cancel='cancel' :addInfo='addInfo'></addinfo>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vList from './list'
import addinfo from './addinfo'
export default {
  data() {
    return {
      addInfo:{
        ishow:false,
        isAdd:true
      }
    };
  },
  components:{
    vList,
    addinfo
  },
  methods: {
    toOpen() {
      this.addInfo.ishow = true
      this.addInfo.isAdd = true
    },
    cancel(e){
      this.addInfo = e
    },
    //封装一个编辑事件
    edit(e){
      this.addInfo.ishow = true
      this.addInfo.isAdd = false
      this.$refs.vAdd.lookUp(e)
    }
  },
};
</script>

<style  lang="" scoped>

</style>
