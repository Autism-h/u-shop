// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//仓库数据
import store from './store'

//引入elementUI库
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

//引入全局样式
import './assets/css/reset.css'

//引入全局组件
import vGcom from './common'
for(let i in vGcom){
  Vue.component(i,vGcom[i])
}

//封装一个全局图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
