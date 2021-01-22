import {menuList} from  '../../../util/axios'
const state = {
    menuList:[]
}

const getters = {
    getMenuList(state){
        return state.menuList
    }
}

const mutations = {
    MENULIST(state,plyload){
        state.menuList = plyload
    }
}

const actions = {
    getMenuListAction({commit}){
        menuList().then(res=>{
            if(res.data.code == 200){
                commit('MENULIST',res.data.list)
            }else{
                console.log(err,'失败');
            }
        }).catch(err=>{
            console.log(err,'失败');
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}