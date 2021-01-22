import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'

export default new vuex.Store({
    modules:{
        menu,
        role,
        user,
        cate,
        specs,
        goods,
        banner
    }
})