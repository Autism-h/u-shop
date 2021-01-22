import {roleList} from  '../../../util/axios'
const state = {
    roleList:[]
}

const getters = {
    getRoleList(state){
        return state.roleList
    }
}

const mutations = {
    ROLELIST(state,plyload){
        state.roleList = plyload
    }
}

const actions = {
    getRolistAction({commit}){
        roleList().then(res=>{
            if(res.data.code == 200){
                commit('ROLELIST',res.data.list)
            }
        }).catch(err=>{
            console.log(err);
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