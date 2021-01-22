import {cateList} from  '../../../util/axios'
const state = {
    cateList:[]
}

const getters = {
    getCateList(state){
        return state.cateList
    }
}

const mutations = {
    CATELIST(state,plyload){
        state.cateList = plyload
    }
}

const actions = {
    getCateListAction({commit}){
        cateList().then(res=>{
            if(res.data.code == 200){
                commit('CATELIST',res.data.list)
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